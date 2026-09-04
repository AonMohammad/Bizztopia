import sqlite3
import html
import re
import json
import random

db_path = r'e:\bizztopia\database\database.sqlite'
pexels_path = r'e:\bizztopia\resources\js\data\subcategory_images.json'

with open(pexels_path, 'r', encoding='utf-8') as f:
    pexels_catalog = json.load(f)

# Collect all Pexels HD photo URLs into a flat pool
all_photos = []
if isinstance(pexels_catalog, dict):
    for sub, photos in pexels_catalog.items():
        if isinstance(photos, list):
            for p in photos:
                if isinstance(p, dict) and p.get('url'):
                    all_photos.append(p['url'])
                elif isinstance(p, str):
                    all_photos.append(p)

print(f'Total available HD Pexels photos: {len(all_photos)}')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute('SELECT id, title, subtitle, content, hero_image FROM articles')
articles = cursor.fetchall()

def clean_text(text):
    if not text:
        return ''
    # Unescape HTML entities
    decoded = html.unescape(text)
    # Remove raw <a href=...>...</a> or <font> tags completely
    cleaned = re.sub(r'<a\b[^>]*>(.*?)</a>', r'\1', decoded, flags=re.IGNORECASE)
    cleaned = re.sub(r'<a\b[^>]*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'href\s*=\s*"[^"]*"', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"href\s*=\s*'[^']*'", '', cleaned, flags=re.IGNORECASE)
    # Remove raw Google News URLs
    cleaned = re.sub(r'https?://news\.google\.com[^\s<>\'"]+', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<font[^>]*>(.*?)</font>', r'\1', cleaned, flags=re.IGNORECASE)
    # Remove leftover "<a", "(Part X)", "href=" artifacts
    cleaned = re.sub(r'<a\s*$', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\(Part\s*\d+\)', '', cleaned, flags=re.IGNORECASE)
    # Clean double spaces
    return re.sub(r'\s+', ' ', cleaned).strip()

used_images = set()
updated_count = 0

for art in articles:
    art_id, title, subtitle, content, hero_image = art
    
    c_title = clean_text(title)
    c_subtitle = clean_text(subtitle)
    c_content = content
    if c_content:
        # Remove any raw google news links inside HTML body
        c_content = re.sub(r'<a\b[^>]*href=[\"\']https?://news\.google\.com[^\'\"]*[\"\'][^>]*>(.*?)</a>', r'\1', c_content, flags=re.IGNORECASE)
        c_content = re.sub(r'https?://news\.google\.com[^\s<>\"\']+', '', c_content, flags=re.IGNORECASE)
        c_content = re.sub(r'\(Part\s*\d+\)', '', c_content, flags=re.IGNORECASE)

    # Ensure unique HD image
    image = hero_image
    if not image or image in used_images:
        available = [p for p in all_photos if p not in used_images]
        if available:
            image = random.choice(available)
        else:
            image = f'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80&sig={art_id}'

    used_images.add(image)

    cursor.execute('''
        UPDATE articles 
        SET title = ?, subtitle = ?, content = ?, hero_image = ?
        WHERE id = ?
    ''', (c_title, c_subtitle, c_content, image, art_id))
    updated_count += 1

conn.commit()
print(f'Sanitized and assigned unique HD images for all {updated_count} articles in SQLite database.')

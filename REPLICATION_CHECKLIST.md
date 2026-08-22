# Master CAP Vertical Replication Checklist

This checklist defines the standard procedure for cloning and customizing the **Bizztopia Master CAP Engine** for future Techception vertical platforms (*Regentology*, *Rate My Doc*, *WeddingHub*, *HouzzWise*, *TruSecur*, etc.).

---

## 📋 8-Step Vertical Replication Workflow

### 1. Environment & Vertical Configuration (`config/cap.php`)
- [ ] Duplicate `.env.example` and set `CAP_NAME`, `CAP_DOMAIN`, `CAP_INDUSTRY`, and `CAP_REGION`.
- [ ] Example for Regentology:
  ```env
  CAP_NAME="Regentology"
  CAP_DOMAIN="regentology.com"
  CAP_INDUSTRY="Real Estate Professionals"
  ```

### 2. Design System & Theme Token Override (`resources/css/app.css`)
- [ ] Update HSL CSS variables for brand primary, secondary, and accent colors to match the vertical identity.
- [ ] Example for Regentology (Gold & Emerald palette):
  ```css
  --brand-primary: #D4AF37;
  --brand-secondary: #0B4D3B;
  ```

### 3. Module Pillar Feature Flags (`config/cap.php`)
- [ ] Enable/disable specific module pillars required for the target industry:
  ```php
  'modules' => [
      'attract' => true,
      'engage' => true,
      'value' => true, // e.g. Mortgage Calculator for Regentology
      'social' => true,
      'inspire' => true, // e.g. Property Galleries for Regentology
      'discover' => false,
  ],
  ```

### 4. Vertical Seeder Execution (`database/seeders/`)
- [ ] Replace default general business content in seeders with industry-specific data:
  - **Attract**: Real estate guides, medical playbooks, home remodeling checklists.
  - **Engage**: Vertical polls (*"What is your target home buying timeline?"*).
  - **Value**: Industry calculators (*Mortgage Estimator*, *Bathroom Remodel Cost Tool*).
  - **Social**: Specialized community Q&A forums & verified reviews.
  - **Inspire**: Architectural & interior property design galleries.

### 5. Database Migration Execution
- [ ] Run isolated migrations:
  ```bash
  php artisan migrate:fresh --seed
  ```

### 6. Frontend Build Verification
- [ ] Compile production assets:
  ```bash
  cmd /c "npm run build"
  ```

### 7. Module Independence Audit
- [ ] Verify using `ReplicationManager::auditReadiness()` that no vertical code directly accesses internal database schemas of other modules.

### 8. Deployment & Edge Caching Setup
- [ ] Deploy to target domain and enable Cloudflare CDN caching and SSL certificates.

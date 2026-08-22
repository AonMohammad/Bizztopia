import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Sparkles, ArrowRight, RotateCcw, Trophy, CheckCircle } from 'lucide-react';

export interface QuizOptionItem {
    id: number;
    option_text: string;
    trait_score?: string;
}

export interface QuizQuestionItem {
    id: number;
    question_text: string;
    subtitle?: string;
    options: QuizOptionItem[];
}

export interface QuizResultItem {
    id: number;
    result_title: string;
    trait_code?: string;
    description: string;
    recommended_cta_label?: string;
    recommended_cta_link?: string;
}

export interface QuizCardProps {
    id: number;
    title: string;
    description?: string;
    type?: string;
    questions: QuizQuestionItem[];
    results: QuizResultItem[];
    onSubmitQuiz?: (answers: Record<string, string>) => Promise<QuizResultItem | null>;
    className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
    id,
    title,
    description,
    type = 'personality',
    questions,
    results,
    onSubmitQuiz,
    className = ''
}) => {
    const [currentStep, setCurrentStep] = useState<number>(0); // 0 = start screen, 1..N = question, N+1 = result
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
    const [computedResult, setComputedResult] = useState<QuizResultItem | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const activeQuestion = currentStep > 0 && currentStep <= questions.length 
        ? questions[currentStep - 1] 
        : null;

    const handleOptionSelect = (trait?: string) => {
        if (!activeQuestion || !trait) return;
        
        const updatedAnswers = {
            ...userAnswers,
            [`q_${activeQuestion.id}`]: trait
        };
        setUserAnswers(updatedAnswers);
        setSelectedTrait(trait);
    };

    const handleNextStep = async () => {
        if (currentStep < questions.length) {
            setCurrentStep((prev) => prev + 1);
            setSelectedTrait(null);
        } else {
            // Submit and calculate result
            setSubmitting(true);
            try {
                if (onSubmitQuiz) {
                    const res = await onSubmitQuiz(userAnswers);
                    setComputedResult(res);
                } else {
                    // Fallback client calculation
                    const traitCounts: Record<string, number> = {};
                    Object.values(userAnswers).forEach((t) => {
                        traitCounts[t] = (traitCounts[t] || 0) + 1;
                    });
                    const dominant = Object.keys(traitCounts).reduce((a, b) => traitCounts[a] > traitCounts[b] ? a : b, 'visionary');
                    const matched = results.find((r) => r.trait_code === dominant) || results[0];
                    setComputedResult(matched);
                }
                setCurrentStep(questions.length + 1);
            } catch (err) {
                console.error('Quiz submission error:', err);
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setUserAnswers({});
        setSelectedTrait(null);
        setComputedResult(null);
    };

    return (
        <div 
            className={`
                bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md transition-all duration-300 space-y-6
                ${className}
            `}
        >
            {/* Step 0: Start Screen */}
            {currentStep === 0 && (
                <div className="space-y-6 text-center py-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center mx-auto shadow-xs">
                        <Sparkles className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                        <Badge variant="brand" size="sm">Interactive {type} Quiz</Badge>
                        <h3 className="text-2xl font-bold font-outfit text-[#102A3D]">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-xs text-[#466071] max-w-md mx-auto leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                    <Button 
                        variant="primary" 
                        size="md" 
                        onClick={() => setCurrentStep(1)}
                        className="mx-auto"
                    >
                        Start Quiz <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                </div>
            )}

            {/* Steps 1..N: Question Steps */}
            {activeQuestion && (
                <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-[#718797]">
                            <span>Question {currentStep} of {questions.length}</span>
                            <span>{Math.round((currentStep / questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#EEF4F8] overflow-hidden">
                            <div 
                                className="h-full bg-[#4A9AD4] transition-all duration-300"
                                style={{ width: `${(currentStep / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Header */}
                    <div className="space-y-1">
                        <h4 className="text-xl font-bold font-outfit text-[#102A3D]">
                            {activeQuestion.question_text}
                        </h4>
                        {activeQuestion.subtitle && (
                            <p className="text-xs text-[#466071]">{activeQuestion.subtitle}</p>
                        )}
                    </div>

                    {/* Options List */}
                    <div className="space-y-2.5">
                        {activeQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.trait_score)}
                                className={`
                                    w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all duration-200
                                    flex items-center justify-between
                                    ${selectedTrait === option.trait_score
                                        ? 'border-[#4A9AD4] bg-[#EAF5FC] text-[#0B4778] shadow-xs'
                                        : 'border-[#E6EEF3] bg-white text-[#102A3D] hover:border-[#B9CBD6] hover:bg-[#F8FBFD]'}
                                `}
                            >
                                <span>{option.option_text}</span>
                                <div className={`
                                    w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3
                                    ${selectedTrait === option.trait_score ? 'border-[#0B4778] bg-[#0B4778]' : 'border-[#D4E0E7]'}
                                `}>
                                    {selectedTrait === option.trait_score && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        disabled={!selectedTrait || submitting}
                        isLoading={submitting}
                        onClick={handleNextStep}
                    >
                        {currentStep < questions.length ? 'Next Question' : 'Calculate My Result'}
                    </Button>
                </div>
            )}

            {/* Step N+1: Result Screen */}
            {currentStep > questions.length && computedResult && (
                <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#EAF8F1] text-[#249A68] flex items-center justify-center mx-auto shadow-xs">
                        <Trophy className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <Badge variant="success" size="md">Quiz Result</Badge>
                        <h3 className="text-3xl font-extrabold font-outfit text-[#102A3D]">
                            {computedResult.result_title}
                        </h3>
                        <p className="text-sm text-[#466071] max-w-md mx-auto leading-relaxed">
                            {computedResult.description}
                        </p>
                    </div>

                    {/* Result CTA Button */}
                    {computedResult.recommended_cta_label && (
                        <div className="pt-2">
                            <a href={computedResult.recommended_cta_link || '/#value'}>
                                <Button variant="secondary" size="md" className="bg-[#0B4778] text-white hover:bg-[#062F52]">
                                    {computedResult.recommended_cta_label} <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Button>
                            </a>
                        </div>
                    )}

                    <button 
                        onClick={handleReset}
                        className="inline-flex items-center gap-1 text-xs text-[#718797] font-semibold hover:text-[#102A3D] transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

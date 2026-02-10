import React, { useEffect, useState } from 'react';

interface ProjectTooltipProps {
    content: {
        name: string;
        images: string[];
    } | null;
    visible: boolean;
}

const ProjectTooltip: React.FC<ProjectTooltipProps> = ({ content, visible }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        if (visible) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [visible]);

    useEffect(() => {
        if (visible && content && content.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImgIndex((prev) => (prev + 1) % content.images.length);
            }, 2500);
            return () => clearInterval(interval);
        } else {
            setCurrentImgIndex(0);
        }
    }, [visible, content]);

    if (!visible || !content) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: position.x + 15,
                top: position.y + 15,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '12px',
                pointerEvents: 'none',
                zIndex: 1000,
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'opacity 0.2s',
                width: '240px'
            }}
            className="animate-fade-in"
        >
            <div style={{ position: 'relative', height: '140px', overflow: 'hidden', borderRadius: '10px' }}>
                {content.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${content.name} ${idx}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: currentImgIndex === idx ? 1 : 0,
                            transition: 'opacity 0.6s ease-in-out',
                            transform: currentImgIndex === idx ? 'scale(1)' : 'scale(1.1)'
                        }}
                    />
                ))}
                {content.images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '4px'
                    }}>
                        {content.images.map((_, idx) => (
                            <div key={idx} style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: currentImgIndex === idx ? 'white' : 'rgba(255,255,255,0.4)',
                                transition: 'all 0.3s'
                            }} />
                        ))}
                    </div>
                )}
            </div>
            <div style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)'
            }}>
                {content.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Premium Development • {content.images.length} Photos
            </div>
        </div>
    );
};

export default ProjectTooltip;

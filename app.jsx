const { useState, useRef, useEffect } = React;

// Minimal inline SVG icons
const Icons = {
    Shield: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Upload: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
    Image: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
    X: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Check: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>,
    AlertTriangle: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    Cpu: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
    Target: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    Send: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    Users: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Loader: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
    Zap: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Menu: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    FileText: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>,
    Download: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
};

// --- API ---
const API_URL = 'http://localhost:8000';

const predictImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Prediction failed');
    }
    return await response.json();
};

// ============ COMPONENTS ============

function Navigation() {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-inner">
                    <div className="logo">
                        <Icons.Shield className="logo-icon" />
                        <span className="logo-text">DFDS</span>
                    </div>
                    <div className="nav-links">
                        <a href="#" className="nav-link">Home</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#accuracy" className="nav-link">Accuracy</a>
                        <a href="#research" className="nav-link">Research</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>
                    <button className="mobile-menu-btn">
                        <Icons.Menu className="icon" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

function UploadSection({ onImageUpload }) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageUpload(file, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) processFile(e.dataTransfer.files[0]);
    };

    const clearImage = () => {
        setPreview(null);
        onImageUpload(null, null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="upload-area">
            {!preview ? (
                <div
                    className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files.length > 0 && processFile(e.target.files[0])} accept="image/*" />
                    <div className="upload-icon-wrap">
                        <Icons.Upload className="icon-lg" />
                    </div>
                    <h3>Upload an image for analysis</h3>
                    <p>Drag and drop or click to browse. Supports JPG, PNG, WebP.</p>
                    <span className="browse-btn">Browse Files</span>
                </div>
            ) : (
                <div className="preview-wrap">
                    <div className="preview-img-box">
                        <img src={preview} alt="Preview" />
                        <button onClick={clearImage} className="preview-close">
                            <Icons.X className="icon-sm" />
                        </button>
                        <div className="preview-ready">
                            <Icons.Image className="icon-sm" /> Ready
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ResultCard({ result }) {
    if (!result) return null;
    const isReal = result.prediction === 'REAL';
    const colorClass = isReal ? 'green' : 'red';

    return (
        <div className={`result-card ${isReal ? 'is-real' : 'is-fake'}`}>
            <div className="result-top">
                <div className={`result-icon-box ${colorClass}`}>
                    {isReal ? <Icons.Check className="icon-lg" /> : <Icons.AlertTriangle className="icon-lg" />}
                </div>
                <div>
                    <div className="result-label">Detection Result</div>
                    <div className={`result-value ${colorClass}`}>{result.prediction}</div>
                    <div className="result-desc">
                        {isReal ? "No manipulation artifacts detected." : "High probability of AI generation detected."}
                    </div>
                </div>
            </div>
            <div>
                <div className="confidence-row">
                    <span>Confidence</span>
                    <span className="confidence-num">{result.confidence}%</span>
                </div>
                <div className="confidence-bar">
                    <div className={`confidence-fill ${colorClass}`} style={{ width: `${result.confidence}%` }}></div>
                </div>
            </div>
        </div>
    );
}

function HistorySection({ history }) {
    if (!history || history.length === 0) return null;

    return (
        <section className="history-section">
            <div className="container">
                <div className="section-label">Recent Scans</div>
                <div className="history-grid">
                    {history.map((item) => {
                        const isReal = item.result.prediction === 'REAL';
                        const colorClass = isReal ? 'green' : 'red';
                        return (
                            <div key={item.id} className="history-card">
                                <div className="history-thumb">
                                    <img src={item.previewUrl} alt="Scan" />
                                    <div className={`history-badge ${colorClass}`}>
                                        {isReal ? <Icons.Check className="icon-sm" /> : <Icons.AlertTriangle className="icon-sm" />}
                                        {item.result.prediction}
                                    </div>
                                </div>
                                <div className="history-meta">
                                    <div className="history-conf">
                                        <span>Confidence</span>
                                        <span style={{ color: isReal ? 'var(--green)' : 'var(--red)' }}>{item.result.confidence}%</span>
                                    </div>
                                    <div className="history-filename">{item.fileName}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function AboutSection() {
    const team = [
        { name: "Aarya Thengne", initials: "AT" },
        { name: "Aarya Kshirsagar", initials: "AK" },
        { name: "Aakash Tambe", initials: "AT" },
    ];

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="section-label">About the Project</div>
                <h2 className="about-heading">Deepfake Detection System</h2>
                <p className="about-desc">
                    A major project for the final year of B.Tech Information Technology — Data Analytics (2026), 
                    this system uses deep learning to identify AI-generated and manipulated images. 
                    Built with an Xception CNN architecture trained on a balanced deepfake dataset, 
                    the model analyzes visual artifacts invisible to the human eye to classify images as real or fake.
                </p>

                <div className="about-grid">
                    <div className="about-card">
                        <div className="about-card-icon purple">
                            <Icons.Cpu className="icon" />
                        </div>
                        <h3>Model Architecture</h3>
                        <p>Xception CNN with transfer learning from ImageNet. Fine-tuned on deepfake-specific data with data augmentation for robust detection.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-card-icon green">
                            <Icons.Activity className="icon" />
                        </div>
                        <h3>Tech Stack</h3>
                        <p>Python, TensorFlow/Keras, OpenCV, FastAPI for the backend. React frontend with a simple drag-and-drop interface for image upload.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-card-icon gray">
                            <Icons.Target className="icon" />
                        </div>
                        <h3>Dataset</h3>
                        <p>Trained on a balanced dataset of real and fake images sourced from Kaggle, split into 70% train, 15% validation, and 15% test sets.</p>
                    </div>
                </div>

                <div className="team-section">
                    <h3>Team Members</h3>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <div key={i} className="team-member">
                                <div className="team-avatar">{member.initials}</div>
                                <div className="team-name">{member.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function AccuracySection() {
    return (
        <section id="accuracy" className="accuracy-section">
            <div className="container">
                <div className="section-label">Performance</div>
                <h2 className="accuracy-heading">Model Accuracy</h2>
                <p className="accuracy-desc">
                    Evaluated on a held-out test set. The model uses Test-Time Augmentation (TTA) — averaging predictions on original and flipped images — for more stable results.
                </p>

                <div className="accuracy-grid">
                    <div className="accuracy-card">
                        <div className="num green">93%</div>
                        <div className="label">Test Accuracy</div>
                        <div className="sub">On unseen test images after fine-tuning</div>
                    </div>
                    <div className="accuracy-card">
                        <div className="num purple">0.98</div>
                        <div className="label">AUC Score</div>
                        <div className="sub">Area Under ROC Curve</div>
                    </div>
                    <div className="accuracy-card">
                        <div className="num green">97.31%</div>
                        <div className="label">Fake Detection</div>
                        <div className="sub">Confidence on sample fake image</div>
                    </div>
                    <div className="accuracy-card">
                        <div className="num green">98.97%</div>
                        <div className="label">Real Detection</div>
                        <div className="sub">Confidence on sample real image</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ResearchSection() {
    return (
        <section id="research" className="research-section pt-pb border-t">
            <div className="container">
                <div className="section-label">Documentation</div>
                <h2 className="about-heading">Research Paper</h2>
                <p className="about-desc">
                    For a comprehensive overview of the methodology, architecture, and training process of the Deepfake Detection System, please refer to our full research paper, written in IEEE format.
                </p>

                <div className="research-card">
                    <div className="research-content">
                        <div className="research-icon">
                            <Icons.FileText className="icon-xl text-primary" />
                        </div>
                        <div className="research-info">
                            <h3>Deepfake Detection System: Research & Methodology</h3>
                            <p>Author: Aarya Thengne, Aarya Kshirsagar, Aakash Tambe</p>
                            <span className="file-meta">PDF format • IEEE Standard</span>
                        </div>
                    </div>
                    <a href="DFDS Research paper IEEE format.pdf" download className="download-btn">
                        <Icons.Download className="icon-sm" /> Download Paper
                    </a>
                </div>
            </div>
        </section>
    );
}

function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="section-label">Get in Touch</div>
                <h2 className="contact-heading">Contact Us</h2>
                <p className="contact-desc">Have questions or feedback? Fill in your details below.</p>

                {submitted ? (
                    <div className="form-success animate-fade-in">
                        ✓ Thank you! Your message has been submitted.
                    </div>
                ) : (
                    <form className="contact-form animate-fade-in" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" placeholder="Write your message..." value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            <Icons.Send className="icon-sm" /> Send Message
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <p className="footer-name">Deepfake Detection System</p>
                    <p>B.Tech IT — Data Analytics, Major Project 2026</p>
                    <p>© {new Date().getFullYear()} Aarya Thengne, Aarya Kshirsagar, Aakash Tambe</p>
                </div>
            </div>
        </footer>
    );
}

// ============ APP ============

function App() {
    const isExtension = !!(window.chrome && chrome.tabs);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [scanComplete, setScanComplete] = useState(!isExtension);

    const handleImageUpload = (file, previewUrl) => {
        setSelectedFile(file);
        setPreview(previewUrl);
        setResult(null);
    };

    // Auto-detect image from active tab
    useEffect(() => {
        if (window.chrome && chrome.tabs && chrome.scripting) {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0] && !tabs[0].url.startsWith('chrome://')) {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        func: () => {
                            return new Promise((resolve) => {
                                const images = Array.from(document.querySelectorAll('img'));
                                let maxArea = 0;
                                let bestImg = null;
                                images.forEach(img => {
                                    const rect = img.getBoundingClientRect();
                                    const area = rect.width * rect.height;
                                    if (area > 22500 && img.src && !img.src.includes('emoji')) {
                                        if (area > maxArea) {
                                            maxArea = area;
                                            bestImg = img;
                                        }
                                    }
                                });
                                
                                if (!bestImg) {
                                    resolve(null);
                                    return;
                                }

                                try {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = bestImg.naturalWidth || bestImg.width || 500;
                                    canvas.height = bestImg.naturalHeight || bestImg.height || 500;
                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(bestImg, 0, 0, canvas.width, canvas.height);
                                    resolve(canvas.toDataURL('image/jpeg', 0.9));
                                } catch(e) {
                                    resolve(bestImg.src);
                                }
                            });
                        }
                    }).then((injectionResults) => {
                        let found = false;
                        for (const frameResult of injectionResults) {
                            const result = frameResult.result;
                            if (result) {
                                found = true;
                                fetch(result)
                                    .then(res => res.blob())
                                    .then(blob => {
                                        const file = new File([blob], "auto-detected.jpg", { type: blob.type || 'image/jpeg' });
                                        handleImageUpload(file, result);
                                        setScanComplete(true);
                                    })
                                    .catch(err => {
                                        console.error("Error fetching detected image:", err);
                                        setScanComplete(true);
                                    });
                            }
                        }
                        if (!found) setScanComplete(true);
                    }).catch(err => {
                        console.error("Script injection failed:", err);
                        setScanComplete(true);
                    });
                } else {
                    setScanComplete(true);
                }
            });
        }
    }, [isExtension]);

    const handleDetect = async () => {
        if (!selectedFile) return;
        setIsProcessing(true);
        setResult(null);
        try {
            const response = await predictImage(selectedFile);
            setResult(response);
            setHistory(prev => [{
                id: Date.now().toString(),
                fileName: selectedFile.name,
                previewUrl: preview,
                result: response,
            }, ...prev].slice(0, 8));
        } catch (error) {
            console.error("Detection failed:", error);
            const msg = error.message || "Detection failed. Make sure the backend server is running.";
            alert(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isExtension) {
        return (
            <div className="animate-fade-in ext-popup-layout" style={{ paddingBottom: '24px' }}>
                <Navigation />
                <main style={{ padding: '24px 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div className="hero-label" style={{ marginBottom: '8px' }}>DFDS Auto-Scanner</div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Automatically scanning the current page for faces to detect AI manipulation.
                        </p>
                    </div>

                    {!scanComplete && !selectedFile && (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-dim)' }}>
                            <Icons.Loader className="icon-lg animate-spin" style={{ marginBottom: '12px', color: 'var(--accent)' }} />
                            <p>Scanning page for images...</p>
                        </div>
                    )}

                    {scanComplete && !selectedFile && (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-dim)' }}>
                            <Icons.X className="icon-lg" style={{ marginBottom: '12px', color: 'var(--text-dim)' }} />
                            <p>No suitable image detected on this page.</p>
                            <p style={{ fontSize: '12px', marginTop: '8px' }}>Try opening an image directly or scrolling so it's fully visible.</p>
                        </div>
                    )}

                    {selectedFile && (
                        <div className="animate-slide-up">
                            <div className="preview-wrap" style={{ marginBottom: '16px', borderRadius: '12px', background: '#000' }}>
                                <div className="preview-img-box" style={{ aspectRatio: 'auto', maxHeight: '240px' }}>
                                    <img src={preview} alt="Detected" style={{ objectFit: 'contain' }} />
                                    <div className="preview-ready">
                                        <Icons.Target className="icon-sm" /> Target Acquired
                                    </div>
                                </div>
                            </div>
                            
                            {!result ? (
                                <button
                                    onClick={handleDetect}
                                    disabled={isProcessing}
                                    className={`detect-btn active`}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    {isProcessing ? (
                                        <><Icons.Loader className="icon animate-spin" /> Analyzing Image...</>
                                    ) : (
                                        <><Icons.Zap className="icon icon-fill" /> Run Analysis</>
                                    )}
                                </button>
                            ) : (
                                <div>
                                    <ResultCard result={result} />
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <Navigation />

            <main>
                {/* Hero */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-label animate-slide-up">Deepfake Detection System</div>
                        <h1 className="animate-slide-up delay-1">
                            Detect AI-Generated<br />Deepfakes Instantly
                        </h1>
                        <p className="animate-slide-up delay-2">
                            Upload an image to check whether it is authentic or AI-generated. 
                            Powered by an Xception CNN trained on real and synthetic face data.
                        </p>

                        <div className="animate-slide-up delay-3">
                            <UploadSection onImageUpload={handleImageUpload} />
                        </div>

                        <div className="detect-wrap animate-slide-up delay-3">
                            <button
                                onClick={handleDetect}
                                disabled={!selectedFile || isProcessing}
                                className={`detect-btn ${(!selectedFile || isProcessing) ? 'disabled' : 'active'}`}
                            >
                                {isProcessing ? (
                                    <><Icons.Loader className="icon" /> Analyzing...</>
                                ) : (
                                    <><Icons.Zap className="icon icon-fill" /> Detect Image</>
                                )}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Result */}
                {result && (
                    <section className="result-section">
                        <div className="container">
                            <ResultCard result={result} />
                        </div>
                    </section>
                )}

                {/* History */}
                {history.length > 0 && <HistorySection history={history} />}

                {/* About */}
                <AboutSection />

                {/* Accuracy */}
                <AccuracySection />

                {/* Research */}
                <ResearchSection />

                {/* Contact */}
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}

// Render
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

(() => {
  // app.jsx
  var { useState, useRef, useEffect } = React;
  var Icons = {
    Shield: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })),
    Upload: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "3", y2: "15" })),
    Image: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "9", r: "2" }), /* @__PURE__ */ React.createElement("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })),
    X: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" }), /* @__PURE__ */ React.createElement("path", { d: "m6 6 12 12" })),
    Check: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })),
    AlertTriangle: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }), /* @__PURE__ */ React.createElement("path", { d: "M12 9v4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 17h.01" })),
    Cpu: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("rect", { width: "16", height: "16", x: "4", y: "4", rx: "2" }), /* @__PURE__ */ React.createElement("rect", { width: "6", height: "6", x: "9", y: "9", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M15 2v2" }), /* @__PURE__ */ React.createElement("path", { d: "M15 20v2" }), /* @__PURE__ */ React.createElement("path", { d: "M2 15h2" }), /* @__PURE__ */ React.createElement("path", { d: "M2 9h2" }), /* @__PURE__ */ React.createElement("path", { d: "M20 15h2" }), /* @__PURE__ */ React.createElement("path", { d: "M20 9h2" }), /* @__PURE__ */ React.createElement("path", { d: "M9 2v2" }), /* @__PURE__ */ React.createElement("path", { d: "M9 20v2" })),
    Target: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "6" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2" })),
    Activity: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" })),
    Send: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "m22 2-7 20-4-9-9-4Z" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13" })),
    Users: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })),
    Loader: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })),
    Zap: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })),
    Menu: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "20", y1: "12", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "20", y1: "6", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "20", y1: "18", y2: "18" })),
    FileText: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6" }), /* @__PURE__ */ React.createElement("path", { d: "M16 13H8" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17H8" }), /* @__PURE__ */ React.createElement("path", { d: "M10 9H8" })),
    Download: (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 10 12 15 17 10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "15", y2: "3" }))
  };
  var API_URL = "http://localhost:8000";
  var predictImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Prediction failed");
    }
    return await response.json();
  };
  function Navigation() {
    return /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("div", { className: "logo" }, /* @__PURE__ */ React.createElement(Icons.Shield, { className: "logo-icon" }), /* @__PURE__ */ React.createElement("span", { className: "logo-text" }, "DFDS")), /* @__PURE__ */ React.createElement("div", { className: "nav-links" }, /* @__PURE__ */ React.createElement("a", { href: "#", className: "nav-link" }, "Home"), /* @__PURE__ */ React.createElement("a", { href: "#about", className: "nav-link" }, "About"), /* @__PURE__ */ React.createElement("a", { href: "#accuracy", className: "nav-link" }, "Accuracy"), /* @__PURE__ */ React.createElement("a", { href: "#research", className: "nav-link" }, "Research"), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "nav-link" }, "Contact")), /* @__PURE__ */ React.createElement("button", { className: "mobile-menu-btn" }, /* @__PURE__ */ React.createElement(Icons.Menu, { className: "icon" })))));
  }
  function UploadSection({ onImageUpload }) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const processFile = (file) => {
      if (file && file.type.startsWith("image/")) {
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
      if (e.dataTransfer.files.length > 0)
        processFile(e.dataTransfer.files[0]);
    };
    const clearImage = () => {
      setPreview(null);
      onImageUpload(null, null);
      if (fileInputRef.current)
        fileInputRef.current.value = "";
    };
    return /* @__PURE__ */ React.createElement("div", { className: "upload-area" }, !preview ? /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `upload-dropzone ${isDragging ? "dragging" : ""}`,
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        onClick: () => fileInputRef.current?.click()
      },
      /* @__PURE__ */ React.createElement("input", { type: "file", className: "hidden", ref: fileInputRef, onChange: (e) => e.target.files.length > 0 && processFile(e.target.files[0]), accept: "image/*" }),
      /* @__PURE__ */ React.createElement("div", { className: "upload-icon-wrap" }, /* @__PURE__ */ React.createElement(Icons.Upload, { className: "icon-lg" })),
      /* @__PURE__ */ React.createElement("h3", null, "Upload an image for analysis"),
      /* @__PURE__ */ React.createElement("p", null, "Drag and drop or click to browse. Supports JPG, PNG, WebP."),
      /* @__PURE__ */ React.createElement("span", { className: "browse-btn" }, "Browse Files")
    ) : /* @__PURE__ */ React.createElement("div", { className: "preview-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "preview-img-box" }, /* @__PURE__ */ React.createElement("img", { src: preview, alt: "Preview" }), /* @__PURE__ */ React.createElement("button", { onClick: clearImage, className: "preview-close" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "icon-sm" })), /* @__PURE__ */ React.createElement("div", { className: "preview-ready" }, /* @__PURE__ */ React.createElement(Icons.Image, { className: "icon-sm" }), " Ready"))));
  }
  function ResultCard({ result }) {
    if (!result)
      return null;
    const isReal = result.prediction === "REAL";
    const colorClass = isReal ? "green" : "red";
    return /* @__PURE__ */ React.createElement("div", { className: `result-card ${isReal ? "is-real" : "is-fake"}` }, /* @__PURE__ */ React.createElement("div", { className: "result-top" }, /* @__PURE__ */ React.createElement("div", { className: `result-icon-box ${colorClass}` }, isReal ? /* @__PURE__ */ React.createElement(Icons.Check, { className: "icon-lg" }) : /* @__PURE__ */ React.createElement(Icons.AlertTriangle, { className: "icon-lg" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "result-label" }, "Detection Result"), /* @__PURE__ */ React.createElement("div", { className: `result-value ${colorClass}` }, result.prediction), /* @__PURE__ */ React.createElement("div", { className: "result-desc" }, isReal ? "No manipulation artifacts detected." : "High probability of AI generation detected."))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "confidence-row" }, /* @__PURE__ */ React.createElement("span", null, "Confidence"), /* @__PURE__ */ React.createElement("span", { className: "confidence-num" }, result.confidence, "%")), /* @__PURE__ */ React.createElement("div", { className: "confidence-bar" }, /* @__PURE__ */ React.createElement("div", { className: `confidence-fill ${colorClass}`, style: { width: `${result.confidence}%` } }))));
  }
  function HistorySection({ history }) {
    if (!history || history.length === 0)
      return null;
    return /* @__PURE__ */ React.createElement("section", { className: "history-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Recent Scans"), /* @__PURE__ */ React.createElement("div", { className: "history-grid" }, history.map((item) => {
      const isReal = item.result.prediction === "REAL";
      const colorClass = isReal ? "green" : "red";
      return /* @__PURE__ */ React.createElement("div", { key: item.id, className: "history-card" }, /* @__PURE__ */ React.createElement("div", { className: "history-thumb" }, /* @__PURE__ */ React.createElement("img", { src: item.previewUrl, alt: "Scan" }), /* @__PURE__ */ React.createElement("div", { className: `history-badge ${colorClass}` }, isReal ? /* @__PURE__ */ React.createElement(Icons.Check, { className: "icon-sm" }) : /* @__PURE__ */ React.createElement(Icons.AlertTriangle, { className: "icon-sm" }), item.result.prediction)), /* @__PURE__ */ React.createElement("div", { className: "history-meta" }, /* @__PURE__ */ React.createElement("div", { className: "history-conf" }, /* @__PURE__ */ React.createElement("span", null, "Confidence"), /* @__PURE__ */ React.createElement("span", { style: { color: isReal ? "var(--green)" : "var(--red)" } }, item.result.confidence, "%")), /* @__PURE__ */ React.createElement("div", { className: "history-filename" }, item.fileName)));
    }))));
  }
  function AboutSection() {
    const team = [
      { name: "Aarya Thengne", initials: "AT" },
      { name: "Aarya Kshirsagar", initials: "AK" },
      { name: "Aakash Tambe", initials: "AT" }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "about", className: "about-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "About the Project"), /* @__PURE__ */ React.createElement("h2", { className: "about-heading" }, "Deepfake Detection System"), /* @__PURE__ */ React.createElement("p", { className: "about-desc" }, "A major project for the final year of B.Tech Information Technology \u2014 Data Analytics (2026), this system uses deep learning to identify AI-generated and manipulated images. Built with an Xception CNN architecture trained on a balanced deepfake dataset, the model analyzes visual artifacts invisible to the human eye to classify images as real or fake."), /* @__PURE__ */ React.createElement("div", { className: "about-grid" }, /* @__PURE__ */ React.createElement("div", { className: "about-card" }, /* @__PURE__ */ React.createElement("div", { className: "about-card-icon purple" }, /* @__PURE__ */ React.createElement(Icons.Cpu, { className: "icon" })), /* @__PURE__ */ React.createElement("h3", null, "Model Architecture"), /* @__PURE__ */ React.createElement("p", null, "Xception CNN with transfer learning from ImageNet. Fine-tuned on deepfake-specific data with data augmentation for robust detection.")), /* @__PURE__ */ React.createElement("div", { className: "about-card" }, /* @__PURE__ */ React.createElement("div", { className: "about-card-icon green" }, /* @__PURE__ */ React.createElement(Icons.Activity, { className: "icon" })), /* @__PURE__ */ React.createElement("h3", null, "Tech Stack"), /* @__PURE__ */ React.createElement("p", null, "Python, TensorFlow/Keras, OpenCV, FastAPI for the backend. React frontend with a simple drag-and-drop interface for image upload.")), /* @__PURE__ */ React.createElement("div", { className: "about-card" }, /* @__PURE__ */ React.createElement("div", { className: "about-card-icon gray" }, /* @__PURE__ */ React.createElement(Icons.Target, { className: "icon" })), /* @__PURE__ */ React.createElement("h3", null, "Dataset"), /* @__PURE__ */ React.createElement("p", null, "Trained on a balanced dataset of real and fake images sourced from Kaggle, split into 70% train, 15% validation, and 15% test sets."))), /* @__PURE__ */ React.createElement("div", { className: "team-section" }, /* @__PURE__ */ React.createElement("h3", null, "Team Members"), /* @__PURE__ */ React.createElement("div", { className: "team-grid" }, team.map((member, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "team-member" }, /* @__PURE__ */ React.createElement("div", { className: "team-avatar" }, member.initials), /* @__PURE__ */ React.createElement("div", { className: "team-name" }, member.name)))))));
  }
  function AccuracySection() {
    return /* @__PURE__ */ React.createElement("section", { id: "accuracy", className: "accuracy-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Performance"), /* @__PURE__ */ React.createElement("h2", { className: "accuracy-heading" }, "Model Accuracy"), /* @__PURE__ */ React.createElement("p", { className: "accuracy-desc" }, "Evaluated on a held-out test set. The model uses Test-Time Augmentation (TTA) \u2014 averaging predictions on original and flipped images \u2014 for more stable results."), /* @__PURE__ */ React.createElement("div", { className: "accuracy-grid" }, /* @__PURE__ */ React.createElement("div", { className: "accuracy-card" }, /* @__PURE__ */ React.createElement("div", { className: "num green" }, "93%"), /* @__PURE__ */ React.createElement("div", { className: "label" }, "Test Accuracy"), /* @__PURE__ */ React.createElement("div", { className: "sub" }, "On unseen test images after fine-tuning")), /* @__PURE__ */ React.createElement("div", { className: "accuracy-card" }, /* @__PURE__ */ React.createElement("div", { className: "num purple" }, "0.98"), /* @__PURE__ */ React.createElement("div", { className: "label" }, "AUC Score"), /* @__PURE__ */ React.createElement("div", { className: "sub" }, "Area Under ROC Curve")), /* @__PURE__ */ React.createElement("div", { className: "accuracy-card" }, /* @__PURE__ */ React.createElement("div", { className: "num green" }, "97.31%"), /* @__PURE__ */ React.createElement("div", { className: "label" }, "Fake Detection"), /* @__PURE__ */ React.createElement("div", { className: "sub" }, "Confidence on sample fake image")), /* @__PURE__ */ React.createElement("div", { className: "accuracy-card" }, /* @__PURE__ */ React.createElement("div", { className: "num green" }, "98.97%"), /* @__PURE__ */ React.createElement("div", { className: "label" }, "Real Detection"), /* @__PURE__ */ React.createElement("div", { className: "sub" }, "Confidence on sample real image")))));
  }
  function ResearchSection() {
    return /* @__PURE__ */ React.createElement("section", { id: "research", className: "research-section pt-pb border-t" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Documentation"), /* @__PURE__ */ React.createElement("h2", { className: "about-heading" }, "Research Paper"), /* @__PURE__ */ React.createElement("p", { className: "about-desc" }, "For a comprehensive overview of the methodology, architecture, and training process of the Deepfake Detection System, please refer to our full research paper, written in IEEE format."), /* @__PURE__ */ React.createElement("div", { className: "research-card" }, /* @__PURE__ */ React.createElement("div", { className: "research-content" }, /* @__PURE__ */ React.createElement("div", { className: "research-icon" }, /* @__PURE__ */ React.createElement(Icons.FileText, { className: "icon-xl text-primary" })), /* @__PURE__ */ React.createElement("div", { className: "research-info" }, /* @__PURE__ */ React.createElement("h3", null, "Deepfake Detection System: Research & Methodology"), /* @__PURE__ */ React.createElement("p", null, "Author: Aarya Thengne, Aarya Kshirsagar, Aakash Tambe"), /* @__PURE__ */ React.createElement("span", { className: "file-meta" }, "PDF format \u2022 IEEE Standard"))), /* @__PURE__ */ React.createElement("a", { href: "DFDS Research paper IEEE format.pdf", download: true, className: "download-btn" }, /* @__PURE__ */ React.createElement(Icons.Download, { className: "icon-sm" }), " Download Paper"))));
  }
  function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3e3);
    };
    return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "contact-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "section-label" }, "Get in Touch"), /* @__PURE__ */ React.createElement("h2", { className: "contact-heading" }, "Contact Us"), /* @__PURE__ */ React.createElement("p", { className: "contact-desc" }, "Have questions or feedback? Fill in your details below."), submitted ? /* @__PURE__ */ React.createElement("div", { className: "form-success animate-fade-in" }, "\u2713 Thank you! Your message has been submitted.") : /* @__PURE__ */ React.createElement("form", { className: "contact-form animate-fade-in", onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "name" }, "Name"), /* @__PURE__ */ React.createElement("input", { type: "text", id: "name", name: "name", placeholder: "Your name", value: formData.name, onChange: handleChange, required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "email" }, "Email"), /* @__PURE__ */ React.createElement("input", { type: "email", id: "email", name: "email", placeholder: "you@example.com", value: formData.email, onChange: handleChange, required: true }))), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "subject" }, "Subject"), /* @__PURE__ */ React.createElement("input", { type: "text", id: "subject", name: "subject", placeholder: "What's this about?", value: formData.subject, onChange: handleChange, required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "message" }, "Message"), /* @__PURE__ */ React.createElement("textarea", { id: "message", name: "message", placeholder: "Write your message...", value: formData.message, onChange: handleChange, required: true })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "submit-btn" }, /* @__PURE__ */ React.createElement(Icons.Send, { className: "icon-sm" }), " Send Message"))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", { className: "footer" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "footer-inner" }, /* @__PURE__ */ React.createElement("p", { className: "footer-name" }, "Deepfake Detection System"), /* @__PURE__ */ React.createElement("p", null, "B.Tech IT \u2014 Data Analytics, Major Project 2026"), /* @__PURE__ */ React.createElement("p", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Aarya Thengne, Aarya Kshirsagar, Aakash Tambe"))));
  }
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
    useEffect(() => {
      if (window.chrome && chrome.tabs && chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && !tabs[0].url.startsWith("chrome://")) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: () => {
                return new Promise((resolve) => {
                  const images = Array.from(document.querySelectorAll("img"));
                  let maxArea = 0;
                  let bestImg = null;
                  images.forEach((img) => {
                    const rect = img.getBoundingClientRect();
                    const area = rect.width * rect.height;
                    if (area > 22500 && img.src && !img.src.includes("emoji")) {
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
                    const canvas = document.createElement("canvas");
                    canvas.width = bestImg.naturalWidth || bestImg.width || 500;
                    canvas.height = bestImg.naturalHeight || bestImg.height || 500;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(bestImg, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL("image/jpeg", 0.9));
                  } catch (e) {
                    resolve(bestImg.src);
                  }
                });
              }
            }).then((injectionResults) => {
              let found = false;
              for (const frameResult of injectionResults) {
                const result2 = frameResult.result;
                if (result2) {
                  found = true;
                  fetch(result2).then((res) => res.blob()).then((blob) => {
                    const file = new File([blob], "auto-detected.jpg", { type: blob.type || "image/jpeg" });
                    handleImageUpload(file, result2);
                    setScanComplete(true);
                  }).catch((err) => {
                    console.error("Error fetching detected image:", err);
                    setScanComplete(true);
                  });
                }
              }
              if (!found)
                setScanComplete(true);
            }).catch((err) => {
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
      if (!selectedFile)
        return;
      setIsProcessing(true);
      setResult(null);
      try {
        const response = await predictImage(selectedFile);
        setResult(response);
        setHistory((prev) => [{
          id: Date.now().toString(),
          fileName: selectedFile.name,
          previewUrl: preview,
          result: response
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
      return /* @__PURE__ */ React.createElement("div", { className: "animate-fade-in ext-popup-layout", style: { paddingBottom: "24px" } }, /* @__PURE__ */ React.createElement(Navigation, null), /* @__PURE__ */ React.createElement("main", { style: { padding: "24px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: "24px" } }, /* @__PURE__ */ React.createElement("div", { className: "hero-label", style: { marginBottom: "8px" } }, "DFDS Auto-Scanner"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", color: "var(--text-secondary)" } }, "Automatically scanning the current page for faces to detect AI manipulation.")), !scanComplete && !selectedFile && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "32px 0", color: "var(--text-dim)" } }, /* @__PURE__ */ React.createElement(Icons.Loader, { className: "icon-lg animate-spin", style: { marginBottom: "12px", color: "var(--accent)" } }), /* @__PURE__ */ React.createElement("p", null, "Scanning page for images...")), scanComplete && !selectedFile && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "32px 0", color: "var(--text-dim)" } }, /* @__PURE__ */ React.createElement(Icons.X, { className: "icon-lg", style: { marginBottom: "12px", color: "var(--text-dim)" } }), /* @__PURE__ */ React.createElement("p", null, "No suitable image detected on this page."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "12px", marginTop: "8px" } }, "Try opening an image directly or scrolling so it's fully visible.")), selectedFile && /* @__PURE__ */ React.createElement("div", { className: "animate-slide-up" }, /* @__PURE__ */ React.createElement("div", { className: "preview-wrap", style: { marginBottom: "16px", borderRadius: "12px", background: "#000" } }, /* @__PURE__ */ React.createElement("div", { className: "preview-img-box", style: { aspectRatio: "auto", maxHeight: "240px" } }, /* @__PURE__ */ React.createElement("img", { src: preview, alt: "Detected", style: { objectFit: "contain" } }), /* @__PURE__ */ React.createElement("div", { className: "preview-ready" }, /* @__PURE__ */ React.createElement(Icons.Target, { className: "icon-sm" }), " Target Acquired"))), !result ? /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleDetect,
          disabled: isProcessing,
          className: `detect-btn active`,
          style: { width: "100%", justifyContent: "center" }
        },
        isProcessing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icons.Loader, { className: "icon animate-spin" }), " Analyzing Image...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icons.Zap, { className: "icon icon-fill" }), " Run Analysis")
      ) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ResultCard, { result })))));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "animate-fade-in" }, /* @__PURE__ */ React.createElement(Navigation, null), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "hero-label animate-slide-up" }, "Deepfake Detection System"), /* @__PURE__ */ React.createElement("h1", { className: "animate-slide-up delay-1" }, "Detect AI-Generated", /* @__PURE__ */ React.createElement("br", null), "Deepfakes Instantly"), /* @__PURE__ */ React.createElement("p", { className: "animate-slide-up delay-2" }, "Upload an image to check whether it is authentic or AI-generated. Powered by an Xception CNN trained on real and synthetic face data."), /* @__PURE__ */ React.createElement("div", { className: "animate-slide-up delay-3" }, /* @__PURE__ */ React.createElement(UploadSection, { onImageUpload: handleImageUpload })), /* @__PURE__ */ React.createElement("div", { className: "detect-wrap animate-slide-up delay-3" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleDetect,
        disabled: !selectedFile || isProcessing,
        className: `detect-btn ${!selectedFile || isProcessing ? "disabled" : "active"}`
      },
      isProcessing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icons.Loader, { className: "icon" }), " Analyzing...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icons.Zap, { className: "icon icon-fill" }), " Detect Image")
    )))), result && /* @__PURE__ */ React.createElement("section", { className: "result-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(ResultCard, { result }))), history.length > 0 && /* @__PURE__ */ React.createElement(HistorySection, { history }), /* @__PURE__ */ React.createElement(AboutSection, null), /* @__PURE__ */ React.createElement(AccuracySection, null), /* @__PURE__ */ React.createElement(ResearchSection, null), /* @__PURE__ */ React.createElement(ContactSection, null)), /* @__PURE__ */ React.createElement(Footer, null));
  }
  var rootElement = document.getElementById("root");
  var root = ReactDOM.createRoot(rootElement);
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();

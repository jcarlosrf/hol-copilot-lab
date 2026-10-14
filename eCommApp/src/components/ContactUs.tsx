import { useState } from 'react';

interface ContactForm {
    name: string;
    email: string;
    request: string;
}

const emptyForm: ContactForm = { name: '', email: '', request: '' };

const ContactUs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<ContactForm>(emptyForm);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setForm(emptyForm);
        setIsSubmitted(true);
    };

    const handleContinue = () => {
        setIsSubmitted(false);
        setIsOpen(false);
    };

    return (
        <>
            <button className="contact-us-button" type="button" onClick={() => setIsOpen(true)}>
                Contact Us
            </button>
            {isOpen && (
                <div className="modal-backdrop contact-modal-backdrop">
                    <section
                        className="modal-content contact-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-modal-title"
                    >
                        {isSubmitted ? (
                            <>
                                <h2 id="contact-modal-title">Thank you for your message.</h2>
                                <button className="contact-submit-button" type="button" onClick={handleContinue}>
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 id="contact-modal-title">Contact Us</h2>
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <label htmlFor="contact-name">Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={event => setForm({ ...form, name: event.target.value })}
                                    />

                                    <label htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={event => setForm({ ...form, email: event.target.value })}
                                    />

                                    <label htmlFor="contact-request">Request</label>
                                    <textarea
                                        id="contact-request"
                                        name="request"
                                        required
                                        value={form.request}
                                        onChange={event => setForm({ ...form, request: event.target.value })}
                                    />

                                    <button className="contact-submit-button" type="submit">Submit</button>
                                </form>
                            </>
                        )}
                    </section>
                </div>
            )}
        </>
    );
};

export default ContactUs;

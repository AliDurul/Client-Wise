import React from 'react'

export default function page() {
    // Prefer configuring the video URL via env for easy updates
    const videoUrl = process.env.NEXT_PUBLIC_EMAIL_INTEGRATION_VIDEO_URL || '';
    const isConfigured = Boolean(videoUrl);

    return (
        <div className="mt-5">
            <div className="panel">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold">Email Integration</h2>
                </div>

                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                        Note: this page provides the CRM Email Service. For security reasons, we do not expose
                        live configuration screens, credentials, or OAuth flows here. The video below is a
                        high-level overview of this page and how the email service works.
                    </p>

                </div>

                <div className="mt-6">

                    <div className="relative w-full overflow-hidden rounded-lg">
                        <video
                            className="w-full h-auto rounded-lg"
                            controls
                            preload="metadata"
                            poster='/assets/videos/email-service-poster.jpg'
                        >
                            <source src='https://ik.imagekit.io/devlee/email-service.mp4' type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </div>
        </div>
    )
}

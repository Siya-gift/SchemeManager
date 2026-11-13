import { Link } from "react-router-dom";

function Privacy() {
  return (
    <main className="min-h-screen bg-[#1E1E1E] px-4 py-10 text-white sm:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl sm:p-10">
        <header className="mb-8 border-b border-white/15 pb-6">
          <Link
            to="/"
            className="mb-6 inline-block text-sm text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
          >
            Back
          </Link>
          <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/65">
            Scheme Manager Pro (Pty) Ltd
            <br />
            Last updated: 14 November 2026
          </p>
        </header>

        <div className="space-y-8 leading-7 text-white/85">
          <section>
            <p>
              This policy explains how Scheme Manager Pro (&quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;) handles information when you
              use the Scheme Manager website and application at{" "}
              <a
                className="text-emerald-300 underline"
                href="https://scheme-manager.com"
              >
                scheme-manager.com
              </a>
              . We aim to handle personal information in accordance with
              applicable privacy laws, including South Africa&apos;s Protection
              of Personal Information Act (POPIA).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Information we collect
            </h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong>Account information:</strong> your name, email address,
                and, if you provide it during email sign-up, phone number.
                Supabase Auth processes sign-in credentials; your password is
                not stored in the application&apos;s scheme records.
              </li>
              <li>
                <strong>Google sign-in information:</strong> if you choose
                Google sign-in, we receive the basic account information needed
                to authenticate you, such as your Google account identifier,
                email address, name, and profile image when available. We use
                the name and image to identify and display your account. We do
                not request access to Gmail, Google Drive, Google Contacts, or
                other Google services.
              </li>
              <li>
                <strong>Scheme and account records:</strong> scheme names,
                monthly contributions, starting balances, and scheme dates are
                stored with your account in Supabase. Email registration also
                creates a basic member profile containing your account ID,
                name, status, paid total, and default scheme.
              </li>
              <li>
                <strong>Information entered in dashboard features:</strong> the
                application provides fields for member names, contributions,
                expenses, payment amounts, dates, methods, and descriptions.
                In the current application, most of this dashboard information
                is held in the browser&apos;s active app state and is not
                uploaded to Supabase by the application. It may be lost when
                the page is refreshed or the session ends; do not rely on it as
                a cloud backup.
              </li>
              <li>
                <strong>Browser storage:</strong> Supabase Auth stores session
                information in your browser to keep you signed in. If you
                select &quot;Remember me,&quot; your email address is saved in
                local browser storage on that device until you remove it or
                clear the browser&apos;s site data.
              </li>
              <li>
                <strong>Technical information:</strong> Google, Supabase, and
                the website&apos;s infrastructure providers may process
                connection and diagnostic information, such as IP address,
                device or browser details, and request timestamps, to provide
                and secure their services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              How we use information
            </h2>
            <p>We use information to:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>create and secure your account and authenticate sign-ins;</li>
              <li>display your account profile and scheme records;</li>
              <li>provide the scheme-management features you request;</li>
              <li>respond to support requests and service-related questions;</li>
              <li>maintain, protect, and troubleshoot the application; and</li>
              <li>meet applicable legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Google user data
            </h2>
            <p>
              Google user data is used only for account authentication and
              related account features described in this policy. We do not
              sell Google user data, use it for advertising, or use it to build
              advertising profiles. We do not disclose it except to the
              services needed to authenticate and operate your account, when
              you direct us to, or when disclosure is required by law. You can
              revoke Scheme Manager&apos;s Google account access in your Google
              Account settings. Google&apos;s handling of its information is
              governed by{" "}
              <a
                className="text-emerald-300 underline"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              How information is shared
            </h2>
            <p>
              We do not sell personal information. We share information only
              as needed with:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <strong>Supabase,</strong> which provides authentication,
                database, and related hosting services for account and scheme
                records. See{" "}
                <a
                  className="text-emerald-300 underline"
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Supabase&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google,</strong> when you choose Google sign-in, to
                authenticate your account.
              </li>
              <li>
                <strong>Authorities or other parties,</strong> when required by
                law or necessary to protect users, the service, or our legal
                rights.
              </li>
            </ul>
            <p className="mt-3">
              Google Fonts are used to display the website. Your browser may
              send technical request information to Google when loading those
              fonts.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Retention and your choices
            </h2>
            <p>
              We keep account and scheme records while they are needed to
              provide the service, comply with legal obligations, resolve
              disputes, and protect the service. Scheme records can be deleted
              from the application. Signing out ends the browser session but
              does not delete your account or records. To request access,
              correction, or deletion of account information, contact us using
              the details below. We may need to verify your identity before
              acting on a request.
            </p>
            <p className="mt-3">
              You can remove a remembered email by unchecking &quot;Remember
              me&quot; or clearing the site&apos;s local storage. You can also
              sign out to end your current session. Information held by Google
              or Supabase may be subject to their own retention practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Security and international processing
            </h2>
            <p>
              We use reasonable safeguards to protect information. The website
              uses HTTPS, and account and scheme records are handled through
              Supabase. No method of transmission or storage is completely
              secure. Google or Supabase may process information in countries
              outside South Africa; their services are subject to their
              respective privacy and security practices and applicable legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Children&apos;s privacy
            </h2>
            <p>
              Scheme Manager is intended for adults managing schemes. The
              service is not directed to children under 18, and we do not
              knowingly collect personal information directly from children
              under 18. If you believe a child has provided information to us,
              please contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              Privacy rights and changes
            </h2>
            <p>
              Depending on applicable law, you may have rights to request
              access to, correction of, or deletion of your personal
              information, or to object to or restrict certain processing.
              South African users may also contact the Information Regulator.
              We may update this policy as the service changes. The revised
              policy will be posted on this page with an updated date.
            </p>
          </section>

          <section className="rounded-xl border border-white/15 bg-white/5 p-5">
            <h2 className="mb-2 text-xl font-semibold text-white">
              Contact us
            </h2>
            <p>
              For privacy questions or requests, contact Scheme Manager Pro
              (Pty) Ltd at{" "}
              <a
                className="text-emerald-300 underline"
                href="tel:+27811225153"
              >
                +27 73 542 4498
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

export default Privacy;

import { LandingUgcArtistSocialMetrics, SocialNetwork } from "@/generated/prisma/client";

interface ArtistSocialMetricsProps {
  metrics: LandingUgcArtistSocialMetrics;
}

/* ── Format large numbers ────────────────────────────────────────────── */
function formatNumber(n: number | bigint | null | undefined): string {
  if (n === null || n === undefined) return "—";
  const num = typeof n === "bigint" ? Number(n) : n;
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}Md`;
  if (num >= 1_000_000)     return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000)         return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return num.toLocaleString("fr-FR");
}

/* ── Social network metadata ─────────────────────────────────────────── */
interface NetworkMeta {
  label: string;
  color: string;          // brand pill border / glow color
  bgGradient: string;     // subtle bg for pill
  icon: React.ReactNode;
}

function getNetworkMeta(network: SocialNetwork): NetworkMeta {
  switch (network) {
    case "INSTAGRAM":
      return {
        label: "Instagram",
        color: "#c13584",
        bgGradient: "linear-gradient(135deg, rgba(64,93,230,0.12), rgba(193,53,132,0.12), rgba(255,220,128,0.08))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
                <stop offset="0%" stopColor="#f09433"/>
                <stop offset="25%" stopColor="#e6683c"/>
                <stop offset="50%" stopColor="#dc2743"/>
                <stop offset="75%" stopColor="#cc2366"/>
                <stop offset="100%" stopColor="#bc1888"/>
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none"/>
            <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)"/>
          </svg>
        ),
      };

    case "TIKTOK":
      return {
        label: "TikTok",
        color: "#69c9d0",
        bgGradient: "linear-gradient(135deg, rgba(105,201,208,0.1), rgba(238,29,82,0.08))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.15 8.15 0 0 0 4.77 1.52V7.03a4.85 4.85 0 0 1-1-.34z" fill="#69c9d0"/>
          </svg>
        ),
      };

    case "YOUTUBE":
      return {
        label: "YouTube",
        color: "#ff0000",
        bgGradient: "linear-gradient(135deg, rgba(255,0,0,0.12), rgba(255,0,0,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.51 3.57 12 3.57 12 3.57s-7.51 0-9.37.49A3.02 3.02 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8A3.02 3.02 0 0 0 2.63 19.93c1.86.49 9.37.49 9.37.49s7.51 0 9.37-.49a3.02 3.02 0 0 0 2.13-2.13c.33-1.82.5-3.71.5-5.8a31.7 31.7 0 0 0-.5-5.8z" fill="#ff0000"/>
            <path d="M9.75 15.02L15.5 12 9.75 8.98v6.04z" fill="white"/>
          </svg>
        ),
      };

    case "FACEBOOK":
      return {
        label: "Facebook",
        color: "#1877f2",
        bgGradient: "linear-gradient(135deg, rgba(24,119,242,0.12), rgba(24,119,242,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877f2"/>
          </svg>
        ),
      };

    case "TWITTER_X":
      return {
        label: "X (Twitter)",
        color: "#e7e9ea",
        bgGradient: "linear-gradient(135deg, rgba(231,233,234,0.08), rgba(231,233,234,0.03))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#e7e9ea"/>
          </svg>
        ),
      };

    case "LINKEDIN":
      return {
        label: "LinkedIn",
        color: "#0077b5",
        bgGradient: "linear-gradient(135deg, rgba(0,119,181,0.12), rgba(0,119,181,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077b5"/>
          </svg>
        ),
      };

    case "PINTEREST":
      return {
        label: "Pinterest",
        color: "#e60023",
        bgGradient: "linear-gradient(135deg, rgba(230,0,35,0.12), rgba(230,0,35,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" fill="#e60023"/>
          </svg>
        ),
      };

    case "SNAPCHAT":
      return {
        label: "Snapchat",
        color: "#fffc00",
        bgGradient: "linear-gradient(135deg, rgba(255,252,0,0.10), rgba(255,252,0,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.34 4.128-.074 1.136 1.494 1.655 2.256 1.595.759-.06 1.01.634.53.955-1.084.719-2.246 1.028-2.703 1.16-.32.093-.509.357-.437.703.123.596.355 1.199.504 1.607.154.418.537 1.14 1.026 1.476.487.337.948.479 1.348.48.4.002.616-.021.664.208.063.29-.277.544-.88.666a3.09 3.09 0 0 0-1.378.598c-.35.244-.465.571-.638.951-.173.38-.359.694-.652.881-.293.188-.53.128-.845.128h-.003c-.314 0-.55.06-.846-.128-.29-.187-.478-.501-.65-.88-.173-.38-.288-.707-.638-.952a3.09 3.09 0 0 0-1.378-.598c-.603-.122-.943-.376-.88-.666.048-.229.264-.206.664-.208.4-.001.861-.143 1.348-.48.489-.336.872-1.058 1.026-1.476.149-.408.381-1.011.504-1.607.072-.346-.117-.61-.437-.703-.457-.132-1.62-.441-2.703-1.16-.48-.321-.229-1.015.53-.955.762.06 2.33-.459 2.256-1.595-.063-.909-.189-2.935.34-4.128 1.583-3.545 4.94-3.821 5.93-3.821z" fill="#fffc00"/>
          </svg>
        ),
      };

    case "TWITCH":
      return {
        label: "Twitch",
        color: "#9146ff",
        bgGradient: "linear-gradient(135deg, rgba(145,70,255,0.12), rgba(145,70,255,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" fill="#9146ff"/>
          </svg>
        ),
      };

    case "THREADS":
      return {
        label: "Threads",
        color: "#e7e9ea",
        bgGradient: "linear-gradient(135deg, rgba(231,233,234,0.08), rgba(231,233,234,0.03))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.513 5.474l-2.oof.54c-.574-3.048-2.51-4.864-5.39-5.2-.53-.066-1.11-.1-1.716-.1-2.738.018-4.833.844-6.226 2.456-1.335 1.547-2.026 3.87-2.053 6.9.027 3.024.718 5.344 2.053 6.892 1.394 1.614 3.49 2.44 6.225 2.455h.016c2.3-.015 3.91-.598 5.106-1.892.709-.76 1.22-1.792 1.57-3.105l2.024.44c-.437 1.68-1.1 3.032-2.097 4.155C19.382 23.04 17.2 23.978 14 24h-.128c-.003.001-.006-.001-.007 0h-.008l-.671.003zM17.857 11.52c-.15-1.657-.86-2.985-2.07-3.82C14.657 6.9 13.357 6.5 11.79 6.5c-.21 0-.422.01-.636.028-2.118.17-3.605 1.35-4.088 3.3-.23.926-.307 1.96-.293 2.93.014.97.115 1.97.37 2.868.536 1.89 1.97 2.96 4.07 3.047h.149c1.486 0 2.701-.38 3.627-1.15 1.085-.896 1.778-2.297 1.87-3.898.012-.218.018-.428.018-.635 0-.16-.004-.323-.01-.47z" fill="#e7e9ea"/>
          </svg>
        ),
      };

    case "DISCORD":
      return {
        label: "Discord",
        color: "#5865f2",
        bgGradient: "linear-gradient(135deg, rgba(88,101,242,0.12), rgba(88,101,242,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865f2"/>
          </svg>
        ),
      };

    case "TELEGRAM":
      return {
        label: "Telegram",
        color: "#26a5e4",
        bgGradient: "linear-gradient(135deg, rgba(38,165,228,0.12), rgba(38,165,228,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#26a5e4"/>
          </svg>
        ),
      };

    case "WHATSAPP":
      return {
        label: "WhatsApp",
        color: "#25d366",
        bgGradient: "linear-gradient(135deg, rgba(37,211,102,0.12), rgba(37,211,102,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25d366"/>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.826L.057 24l6.305-1.654A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.6 9.6 0 0 1-5.12-1.47l-.367-.217-3.804 1 1.02-3.72-.24-.38A9.576 9.576 0 0 1 2.4 12C2.4 6.703 6.703 2.4 12 2.4S21.6 6.703 21.6 12 17.297 21.6 12 21.6z" fill="#25d366"/>
          </svg>
        ),
      };

    case "REDDIT":
      return {
        label: "Reddit",
        color: "#ff4500",
        bgGradient: "linear-gradient(135deg, rgba(255,69,0,0.12), rgba(255,69,0,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" fill="#ff4500"/>
          </svg>
        ),
      };

    case "BEHANCE":
      return {
        label: "Behance",
        color: "#1769ff",
        bgGradient: "linear-gradient(135deg, rgba(23,105,255,0.12), rgba(23,105,255,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-5.101-7.02c-1.494 0-2.747.924-2.935 2.48h5.689c-.088-1.626-1.11-2.48-2.754-2.48zM8.262 17.001H0V5.001h8.199c2.392 0 4.336.963 4.336 3.423 0 1.354-.73 2.431-1.88 2.896 1.509.386 2.337 1.63 2.337 3.184 0 2.878-2.051 4.497-4.73 4.497zM2.587 8.001v3h5.338c1.065 0 1.758-.613 1.758-1.5 0-.896-.693-1.5-1.758-1.5H2.587zm0 5.5v3.5h5.662c1.196 0 1.966-.63 1.966-1.75 0-1.118-.77-1.75-1.966-1.75H2.587z" fill="#1769ff"/>
          </svg>
        ),
      };

    case "DEVIANTART":
      return {
        label: "DeviantArt",
        color: "#05cc47",
        bgGradient: "linear-gradient(135deg, rgba(5,204,71,0.12), rgba(5,204,71,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19.207 4.794L14.8 0h-4.8v.01L7.559 4.952 6 4.966v4.8h2.93L4.793 19.207 9.2 24h4.8v-.01l2.44-4.942L18 19.034v-4.8h-2.93L19.207 4.794zM18 11.862h-2.827l-4.37 8.861v.001L9.2 22.724 6.276 19.8 10.594 11H6v-4.8l1.603-.014 2.603-5.21H14.8l2.924 2.924-4.317 7.962H18v4.8-.8z" fill="#05cc47"/>
          </svg>
        ),
      };

    case "ARTSTATION":
      return {
        label: "ArtStation",
        color: "#13aff0",
        bgGradient: "linear-gradient(135deg, rgba(19,175,240,0.12), rgba(19,175,240,0.04))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.164-1.333h-1.688l9.24 16.018 2.269 3.93A2.424 2.424 0 0 0 24 19.748v-1.999h-.001v-.001zm-11.723-1.38L7.629 6.018 2.97 14.343l9.307.025z" fill="#13aff0"/>
          </svg>
        ),
      };

    default:
      return {
        label: network,
        color: "#9ca3af",
        bgGradient: "linear-gradient(135deg, rgba(156,163,175,0.08), rgba(156,163,175,0.03))",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="1.5"/>
            <path d="M12 8v4l3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
      };
  }
}

/* ── Stat card ───────────────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: string;
  delay: string;
  icon: React.ReactNode;
  accentColor: string;
}

function StatCard({ label, value, delay, icon, accentColor }: StatCardProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div
        style={{
          background: "#1d1c1c",
          border: `1px solid rgba(255,255,255,0.07)`,
          borderRadius: "16px",
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        className="group hover:border-[rgba(96,82,255,0.3)] hover:shadow-[0_0_32px_rgba(96,82,255,0.08)]"
      >
        {/* Corner glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: `radial-gradient(ellipse at 100% 0%, ${accentColor}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {icon}
        </div>

        {/* Value */}
        <div
          className="font-display"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "8px",
          }}
        >
          {value}
        </div>

        {/* Label */}
        <div
          className="font-body"
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {label}
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(to right, ${accentColor}60, ${accentColor}20, transparent)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          className="group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function ArtistSocialMetrics({ metrics }: ArtistSocialMetricsProps) {
  const hasNetworks = metrics.socialNetworks && metrics.socialNetworks.length > 0;
  const hasStats =
    metrics.totalAudience !== null ||
    metrics.averageEngagement !== null ||
    metrics.totalConsumption !== null;

  if (!hasStats && !hasNetworks) return null;

  return (
    <section
      style={{
        background: "#131313",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Section header ── */}
        <div className="animate-fade-in-up mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-display"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#6052ff",
              }}
            >
              02
            </span>
            <span
              style={{
                width: "24px",
                height: "1px",
                background: "rgba(96,82,255,0.4)",
                display: "block",
              }}
            />
            <span
              className="font-display"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Données
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Présence{" "}
            <span style={{ color: "#6052ff" }}>Sociale</span>
          </h2>
          <p
            className="font-body mt-3"
            style={{ color: "#9ca3af", fontSize: "0.9rem", letterSpacing: "0.02em" }}
          >
            Métriques &amp; Plateformes
          </p>
        </div>

        {/* ── 3 KPI cards ── */}
        {hasStats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: hasNetworks ? "40px" : "0",
            }}
          >
            <StatCard
              label="Audience totale"
              value={formatNumber(metrics.totalAudience)}
              delay="0.05s"
              accentColor="#6052ff"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#6052ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#6052ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#6052ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#6052ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <StatCard
              label="Engagement moyen"
              value={
                metrics.averageEngagement !== null && metrics.averageEngagement !== undefined
                  ? formatNumber(metrics.averageEngagement)
                  : "—"
              }
              delay="0.12s"
              accentColor="#e91e8c"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#e91e8c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <StatCard
              label="Consommation totale"
              value={formatNumber(metrics.totalConsumption)}
              delay="0.19s"
              accentColor="#22d3ee"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#22d3ee" strokeWidth="1.8"/>
                </svg>
              }
            />
          </div>
        )}

        {/* ── Social network pills ── */}
        {hasNetworks && (
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.26s" }}
          >
            {/* Divider between stats and pills */}
            {hasStats && (
              <div
                aria-hidden="true"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
                  marginBottom: "32px",
                }}
              />
            )}

            <p
              className="font-display"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "16px",
              }}
            >
              Actif sur
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {metrics.socialNetworks.map((network, i) => {
                const meta = getNetworkMeta(network);
                return (
                  <div
                    key={network}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${0.28 + i * 0.04}s`,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      background: meta.bgGradient,
                      border: `1px solid ${meta.color}28`,
                      transition: "border-color 0.2s ease, transform 0.2s ease",
                      cursor: "default",
                    }}
                    title={meta.label}
                  >
                    {meta.icon}
                    <span
                      className="font-body"
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.75)",
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Updated at */}
        {metrics.updatedAt && (
          <p
            className="font-body animate-fade-in"
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.18)",
              marginTop: "32px",
              letterSpacing: "0.03em",
              animationDelay: "0.5s",
            }}
          >
            Données mises à jour le{" "}
            {new Date(metrics.updatedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </section>
  );
}

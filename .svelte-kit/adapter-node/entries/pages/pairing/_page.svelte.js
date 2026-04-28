import { a as attr_class, a3 as attr, a4 as stringify, a2 as ensure_array_like, e as escape_html, a0 as derived, a5 as bind_props, a1 as head } from "../../../chunks/renderer.js";
/* empty css                                                      */
function Pictogram($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      pictogram,
      speakable,
      size = "large",
      label = "Device fingerprint"
    } = $$props;
    const emojiNames = derived(() => speakable.split("-"));
    $$renderer2.push(`<div${attr_class(`pictogram pictogram--${stringify(size)}`, "svelte-1rf2u8u")}><div class="pictogram__visual svelte-1rf2u8u" role="img"${attr("aria-label", `${stringify(label)}: ${stringify(emojiNames().join(", "))}`)}><!--[-->`);
    const each_array = ensure_array_like(pictogram);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let emoji = each_array[$$index];
      $$renderer2.push(`<span class="pictogram__emoji svelte-1rf2u8u">${escape_html(emoji)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="pictogram__speakable svelte-1rf2u8u"><span class="visually-hidden">Speakable form:</span> ${escape_html(speakable)}</div> <details class="pictogram__details svelte-1rf2u8u"><summary class="svelte-1rf2u8u">Emoji descriptions</summary> <ol class="pictogram__list svelte-1rf2u8u"><!--[-->`);
    const each_array_1 = ensure_array_like(pictogram);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let emoji = each_array_1[i];
      $$renderer2.push(`<li class="svelte-1rf2u8u">${escape_html(emojiNames()[i])} ${escape_html(emoji)}</li>`);
    }
    $$renderer2.push(`<!--]--></ol></details></div>`);
  });
}
function CodeEntry($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { code = "", onComplete, disabled = false, error } = $$props;
    $$renderer2.push(`<div${attr_class("code-entry svelte-14dwbzj", void 0, { "code-entry--error": error })}><label for="pairing-code" class="code-entry__label svelte-14dwbzj">Pairing code (8 digits)</label> <input id="pairing-code" type="text" inputmode="numeric"${attr("pattern", `\\d${stringify(8)}`)} maxlength="8" autocomplete="one-time-code"${attr("disabled", disabled, true)}${attr("value", code)} placeholder="1 2 3 4 5 6 7 8" class="code-entry__input svelte-14dwbzj"${attr("aria-invalid", error ? "true" : "false")}${attr("aria-describedby", error ? "code-error pairing-code-hint" : "pairing-code-hint")}/> <p id="pairing-code-hint" class="code-entry__hint svelte-14dwbzj">Enter or paste the 8-digit code from your other device.</p> `);
    if (error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p id="code-error" class="code-entry__error svelte-14dwbzj" role="alert">${escape_html(error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { code });
  });
}
function _page($$renderer) {
  const serverPictogram = ["🔒", "🛡️", "🔐", "🗝️", "⚡"];
  const serverPictogramSpeakable = "lock-shield-key-oldkey-lightning";
  let codeValue = "";
  let codeError = "";
  function handleCodeComplete(code) {
    console.log("Code complete:", code);
  }
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    head("1uhn07z", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Pair Device — Sigil Auth</title>`);
      });
    });
    $$renderer2.push(`<main id="main" tabindex="-1" class="pairing-container svelte-1uhn07z"><a href="/help" class="help-icon svelte-1uhn07z" aria-label="Get help with pairing"><span aria-hidden="true">?</span></a> <h1 class="svelte-1uhn07z">Pair Your Device</h1> <p class="intro svelte-1uhn07z">Choose a method to pair your Sigil Auth app with this server.</p> <div class="pairing-methods svelte-1uhn07z"><section class="method svelte-1uhn07z" aria-labelledby="qr-heading"><h2 id="qr-heading" class="svelte-1uhn07z">Scan QR Code</h2> <div class="qr-placeholder"><div class="qr-frame svelte-1uhn07z" role="status" aria-label="QR code for pairing with this server. Cannot scan? Enter the 8-digit code below instead."><p class="qr-loading svelte-1uhn07z">Generating QR code...</p></div></div> <div class="server-identity svelte-1uhn07z"><p class="identity-label svelte-1uhn07z">Server:</p> `);
    Pictogram($$renderer2, {
      pictogram: serverPictogram,
      speakable: serverPictogramSpeakable,
      size: "compact",
      label: "Server fingerprint"
    });
    $$renderer2.push(`<!----></div> <ol class="instructions svelte-1uhn07z"><li class="svelte-1uhn07z">Open Sigil Auth app</li> <li class="svelte-1uhn07z">Tap "Scan QR Code"</li> <li class="svelte-1uhn07z">Point camera at this code</li></ol> <p class="expiry svelte-1uhn07z" role="status" aria-live="polite">Expires in <strong>4:58</strong></p></section> <section class="method svelte-1uhn07z" aria-labelledby="code-heading"><h2 id="code-heading" class="svelte-1uhn07z">Enter Pairing Code</h2> <p class="method-description svelte-1uhn07z">Can't scan the QR code? Enter this 8-digit code instead.</p> <div class="pairing-code-display svelte-1uhn07z" aria-label="Pairing code: 8 4 7 2 9 1 3 5"><span class="code-group svelte-1uhn07z"><span class="code-digit svelte-1uhn07z">8</span> <span class="code-digit svelte-1uhn07z">4</span> <span class="code-digit svelte-1uhn07z">7</span> <span class="code-digit svelte-1uhn07z">2</span></span> <span class="code-group svelte-1uhn07z"><span class="code-digit svelte-1uhn07z">9</span> <span class="code-digit svelte-1uhn07z">1</span> <span class="code-digit svelte-1uhn07z">3</span> <span class="code-digit svelte-1uhn07z">5</span></span></div> <p class="method-note svelte-1uhn07z">Or enter the code in your app:</p> `);
    CodeEntry($$renderer2, {
      onComplete: handleCodeComplete,
      error: codeError,
      get code() {
        return codeValue;
      },
      set code($$value) {
        codeValue = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----> <ol class="instructions svelte-1uhn07z"><li class="svelte-1uhn07z">Open Sigil Auth app</li> <li class="svelte-1uhn07z">Tap "Enter Pairing Code"</li> <li class="svelte-1uhn07z">Enter: 84729135</li></ol> <p class="code-info" role="status">Attempts remaining: <strong>3</strong></p></section></div> <details class="help-section svelte-1uhn07z"><summary class="svelte-1uhn07z">Cannot scan QR code?</summary> <p>If you're unable to use the QR code or pairing code, you can manually enter the server
			details:</p> <dl class="manual-entry svelte-1uhn07z"><dt class="svelte-1uhn07z">Server URL:</dt> <dd class="svelte-1uhn07z"><code class="svelte-1uhn07z">https://sigil.example.com:8443</code> <button class="copy-btn svelte-1uhn07z" aria-label="Copy server URL">Copy</button></dd> <dt class="svelte-1uhn07z">Server public key:</dt> <dd class="svelte-1uhn07z"><code class="svelte-1uhn07z">Ag8xYzI3ZWRkNDUzYmNlYzVmMTJjNmI5MzA4OGY0...</code> <button class="copy-btn svelte-1uhn07z" aria-label="Copy public key">Copy</button></dd> <dt class="svelte-1uhn07z">Session token:</dt> <dd class="svelte-1uhn07z"><code class="svelte-1uhn07z">stk_a1b2c3d4e5f6...</code> <button class="copy-btn svelte-1uhn07z" aria-label="Copy session token">Copy</button></dd></dl></details> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
}
export {
  _page as default
};

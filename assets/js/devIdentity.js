const SECRET = "MY_SHARED_SECRET"; // same secret you used to generate tokens

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function computeSignature(devId) {
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(devId)
  );

  return toHex(signature);
}

export async function getDevIdentity() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  // If token is in URL, verify it
  if (token) {
    const [devId, providedSig] = token.split(":");
    if (!devId || !providedSig) return null;

    const expectedSig = await computeSignature(devId);

    if (expectedSig === providedSig) {
      const dev = { id: devId };
      localStorage.setItem("devIdentity", JSON.stringify(dev));

      // Clean URL
      params.delete("token");
      window.history.replaceState({}, "", window.location.pathname);

      return dev;
    }

    return null;
  }

  // Otherwise load from localStorage
  const stored = localStorage.getItem("devIdentity");
  return stored ? JSON.parse(stored) : null;
}

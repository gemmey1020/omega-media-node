import { describe, expect, it } from "vitest";
import contract from "../../contract/media.contract.v1.json";
import { omegaMediaEngine } from "../omegaMediaEngine";

describe("Omega Media Engine", () => {
  it("QR → CONTACT", () => {
    const d = omegaMediaEngine(contract as any, {
      url: "https://x.test/?utm_medium=qr",
      referrer: "",
      userAgent: "test",
      language: "en",
      timeISO: new Date().toISOString(),
    });
    expect(d.mode).toBe("CONTACT");
    expect(d.intent).toBe("CONTACT");
  });

  it("LinkedIn ref → BUSINESS", () => {
    const d = omegaMediaEngine(contract as any, {
      url: "https://x.test/",
      referrer: "https://linkedin.com",
      userAgent: "test",
      language: "en",
      timeISO: new Date().toISOString(),
    });
    expect(d.mode).toBe("BUSINESS");
    expect(d.intent).toBe("WORK");
  });

  it("Internal token → ATLAS (locked)", () => {
    const d = omegaMediaEngine(contract as any, {
      url: "https://x.test/?_omega=ATLAS",
      referrer: "",
      userAgent: "test",
      language: "en",
      timeISO: new Date().toISOString(),
    });
    expect(d.mode).toBe("ATLAS");
  });
});

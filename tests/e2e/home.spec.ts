import { test, expect } from "@playwright/test";

test.describe("Home Page E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("carica la home page con il titolo ed il logo dello studio", async ({ page }) => {
    await expect(page).toHaveTitle(/Studio Dentistico|Implantologia/i);

    // Header logo
    const logo = page.locator("header a[aria-label*='Studio Dentistico']");
    await expect(logo).toBeVisible();
  });

  test("verifica la presenza dei dati strutturati JSON-LD per Dentist/MedicalBusiness", async ({ page }) => {
    const jsonLdScript = page.locator('script[type="application/ld+json"]').first();
    await expect(jsonLdScript).toBeAttached({ timeout: 10000 });

    const content = await jsonLdScript.textContent();
    expect(content).toBeTruthy();
    if (content) {
      const json = JSON.parse(content);
      const isMatch =
        json["@type"]?.includes("Dentist") ||
        json["@type"]?.includes("MedicalBusiness");
      expect(isMatch).toBe(true);
    }
  });

  test("naviga correttamente attraverso i link dell'header o menu mobile", async ({ page, isMobile }) => {
    if (isMobile) {
      const menuBtn = page.locator('button[aria-label="Apri menu"]');
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
      }
      const contattiMobile = page.locator('#mobile-menu a[href="/contatti"]');
      await expect(contattiMobile).toBeVisible();
    } else {
      const serviziLink = page.locator("header nav").getByRole("link", { name: "Servizi" });
      await expect(serviziLink).toBeVisible();
      await serviziLink.click();
      await expect(page).toHaveURL(/\/servizi/);
    }
  });

  test("il pulsante 'Prenota una Visita' o CTA contatti porta alla pagina contatti", async ({ page, isMobile }) => {
    if (isMobile) {
      // Su mobile il pulsante desktop è nascosto, apriamo il menu mobile o clicchiamo la CTA nel contenuto
      const ctaBtn = page.locator('main a[href="/contatti"]').first();
      await expect(ctaBtn).toBeVisible();
      await ctaBtn.click();
      await expect(page).toHaveURL(/\/contatti/);
    } else {
      const prenotaBtn = page.getByRole("link", { name: /Prenota una Visita/i }).first();
      await expect(prenotaBtn).toBeVisible();
      await prenotaBtn.click();
      await expect(page).toHaveURL(/\/contatti/);
    }
  });
});

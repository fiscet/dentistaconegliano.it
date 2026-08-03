import { test, expect } from "@playwright/test";

test.describe("Servizi & Trattamenti E2E Tests", () => {
  test("carica la pagina dei servizi /servizi", async ({ page }) => {
    await page.goto("/servizi");
    await expect(page).toHaveTitle(/Servizi|Trattamenti/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("verifica la navigazione verso un singolo servizio dal contenuto principale", async ({ page }) => {
    await page.goto("/servizi");

    const serviceCard = page.locator('main a[href^="/servizi/"]').first();

    if (await serviceCard.isVisible()) {
      const href = await serviceCard.getAttribute("href");
      if (href && href !== "/servizi") {
        await serviceCard.click();
        await page.waitForURL(new RegExp(href));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
    }
  });

  test("verifica la pagina del percorso di cura /percorso-di-cura", async ({ page }) => {
    await page.goto("/percorso-di-cura");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("verifica la galleria casi clinici /interventi-realizzati", async ({ page }) => {
    await page.goto("/interventi-realizzati");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

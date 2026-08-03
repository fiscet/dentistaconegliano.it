import { test, expect } from "@playwright/test";

test.describe("Location / Zone Servite E2E Tests", () => {
  test("carica la pagina indice delle zone servite /zona", async ({ page }) => {
    await page.goto("/zona");
    await expect(page).toHaveTitle(/Zone|Conegliano/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("verifica che le singole pagine di zona siano aperte correttamente", async ({ page }) => {
    await page.goto("/zona");

    const zoneCard = page.locator('main a[href^="/zona/"]').first();
    if (await zoneCard.isVisible()) {
      const href = await zoneCard.getAttribute("href");
      await zoneCard.click();
      if (href) {
        await expect(page).toHaveURL(new RegExp(href));
      }
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});

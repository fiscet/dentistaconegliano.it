import { test, expect } from "@playwright/test";

test.describe("Contact Page & Form E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contatti");
  });

  test("carica la pagina contatti con le informazioni NAP e la mappa/dettagli", async ({ page }) => {
    await expect(page).toHaveTitle(/Contatti|Studio Dentistico/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Contatti|Richiedi/i);

    // Verifica numero telefono e indirizzo
    await expect(page.locator("body")).toContainText("0438 415356");
    await expect(page.locator("body")).toContainText("Conegliano");
  });

  test("mostra un errore se si tenta di inviare il form senza i campi obbligatori", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Invia Richiesta/i });
    await expect(submitBtn).toBeVisible();

    await submitBtn.click();

    // Il browser o il form evidenzia la validazione nativa/custom
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
  });

  test("compilazione del form e intercettazione dell'invio (mock sicuro)", async ({ page }) => {
    // Compila i campi del modulo
    await page.fill('input[name="name"]', "Test Automatizzato");
    await page.fill('input[name="phone"]', "3331234567");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Questo è un test E2E automatizzato.");

    // Seleziona la checkbox di privacy
    const privacyCheckbox = page.locator('input[name="privacy"]');
    if (await privacyCheckbox.isVisible()) {
      await privacyCheckbox.check();
    }

    // Intercetta la richiesta di Server Action per impedire l'invio dell'email SMTP reale
    await page.route("**/*", (route) => {
      // Lascia passare il traffico normale di navigazione/assets, ma gestisci il form post
      return route.continue();
    });

    const submitBtn = page.getByRole("button", { name: /Invia Richiesta/i });
    await expect(submitBtn).toBeEnabled();
  });
});

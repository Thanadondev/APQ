import { test, expect } from '@playwright/test';

test.describe('Anime Personality Quiz - Full Game Flow', () => {
  test('should complete the journey from home to results', async ({ page }) => {
    test.setTimeout(60000);
    // 1. Go to the app (ensure your dev server is running at localhost:5173)
    await page.goto('http://localhost:5173');
    
    // 2. Check for Title and Language Toggle
    await expect(page.locator('h1')).toContainText(/แบบทดสอบบุคลิกภาพอนิเมะ|Anime Personality Quiz/);
    
    // 3. Switch to English for the test
    const langBtn = page.locator('button:has-text("TH"), button:has-text("EN")');
    const langText = await langBtn.innerText();
    if (langText.includes('TH')) {
        await langBtn.click();
    }

    // 4. Start Adventure
    await page.getByRole('button', { name: /Start Adventure/i }).click();

    // 5. Select Character Class: Mage
    await page.getByRole('button', { name: /Mage/i }).click();

    // 6. Answer 16 Questions
    // We'll click "Strongly Agree" for every question to speed through
    for (let i = 1; i <= 16; i++) {
      // Wait for question to be visible
      await expect(page.locator(`text=${i} / 16`)).toBeVisible();
      
      // Check if boss HP is present
      const hpText = await page.locator('span:has-text("HP")').innerText();
      console.log(`Question ${i}: Boss ${hpText}`);

      // Click "Strongly Agree"
      await page.getByRole('button', { name: /Strongly Agree/i }).click();
      
      // Wait a bit for the animation transition (QuizContainer has a 450ms block)
      await page.waitForTimeout(500);
    }

    // 7. Wait for Boss Defeat animation
    await expect(page.getByText(/Victory! The Demon Lord has fallen!/i)).toBeVisible({ timeout: 5000 });

    // 8. Result screen should appear
    // AI match can take time if calling Gemini API (up to 30s recommended)
    console.log('Waiting for AI analysis and results...');
    await expect(page.getByText(/Your Archetype/i)).toBeVisible({ timeout: 30000 });

    // 9. Verify result components
    await expect(page.locator('.recharts-surface')).toBeVisible(); // Radar chart (SVG)
    await expect(page.getByText(/Winner/i).first()).toBeVisible(); // Winning axis bars (pick first one)
    await expect(page.getByText(/AI Resonance Match/i)).toBeVisible();
    
    // 10. Test Share Button
    await expect(page.getByRole('button', { name: /Share Result/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Share Result/i })).toBeEnabled();
    
    console.log('✅ Automate Test Passed: The Demon Lord was defeated and personality was analyzed!');
  });
});

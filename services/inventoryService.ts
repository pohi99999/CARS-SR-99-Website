import { getCarById, inventory, type Car } from "@/data/inventory";

const simulatedNetworkDelayMs = 0;

function delay(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchInventory(): Promise<Car[]> {
  if (simulatedNetworkDelayMs > 0) {
    await delay(simulatedNetworkDelayMs);
  }
  return inventory;
}

export async function getCarByIdAsync(id: string): Promise<Car | undefined> {
  if (simulatedNetworkDelayMs > 0) {
    await delay(simulatedNetworkDelayMs);
  }
  return getCarById(id);
}

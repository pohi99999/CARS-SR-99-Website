import { getCarById, inventory, type Car } from "@/data/inventory";

const simulatedNetworkDelayMs = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchInventory(): Promise<Car[]> {
  await delay(simulatedNetworkDelayMs);

  // TODO: Replace local data source with external XML/JSON inventory feed fetch (e.g. Használtautó.hu).
  // TODO: Parse and normalize external feed records here before returning the domain model.
  return inventory;
}

export async function getCarByIdAsync(id: string): Promise<Car | undefined> {
  await delay(simulatedNetworkDelayMs);

  // TODO: Replace with external feed item lookup once XML/JSON parser integration is in place.
  return getCarById(id);
}

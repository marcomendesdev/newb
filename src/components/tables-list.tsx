"use client";

import TableCard from "./table-card";

interface TablesListProps {
  tables: { id: string; name: string; capacity: number; location: string }[]; 
}

export default function TablesList({ tables }: TablesListProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold py-12">Tables</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tables &&
            tables.map((table) => (
              <TableCard
                key={table.id}
                name={table.name}
                capacity={table.capacity}
                location={table.location}
                id={table.id}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
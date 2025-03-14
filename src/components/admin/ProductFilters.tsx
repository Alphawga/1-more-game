'use client';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string | null;
  onCategoryChange: (value: string | null) => void;
  statusFilter: boolean | null;
  onStatusChange: (value: boolean | null) => void;
  categories: string[];
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search Products
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Search by name..."
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={categoryFilter || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={statusFilter === null ? '' : statusFilter.toString()}
          onChange={(e) => {
            const value = e.target.value;
            onStatusChange(value === '' ? null : value === 'true');
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    </div>
  );
} 
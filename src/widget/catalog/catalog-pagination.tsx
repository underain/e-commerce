import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/shared/ui/pagination";

interface CatalogProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    brand?: string;
    memory?: string;
  }>;
  totalPage: number;

}

const CatalogPagination = async ({
  searchParams,
  totalPage,

}: CatalogProps) => {
  const page = (await searchParams).page
    ? parseInt((await searchParams).page!)
    : 1;
  const params = await searchParams;
  const generatePageUrl = (newPage: number) => {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set("category", params.category);
    if (params.brand) searchParams.set("brand", params.brand);
    if (params.memory) searchParams.set("memory", params.memory);
    searchParams.set("page", newPage.toString());
    return `/catalog?${searchParams.toString()}`;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={generatePageUrl(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={generatePageUrl(1)} isActive={1 === page}>
            1
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: 3 }, (_, i) => page - 1 + i)
          .filter((p) => p > 1 && p < totalPage)
          .map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={generatePageUrl(pageNum)}
                isActive={pageNum === page}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

        {page < totalPage - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href={generatePageUrl(totalPage)}
              isActive={totalPage === page}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={generatePageUrl(Math.min(totalPage, page + 1))}
            aria-disabled={page >= totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CatalogPagination;

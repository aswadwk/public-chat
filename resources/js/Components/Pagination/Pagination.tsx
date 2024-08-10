import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

export default function PaginationCustom({ links }: any) {
  const first = links[0];
  const last = links[links.length - 1];

  const linksExcludeFirstAndLast = links.slice(1, links.length - 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious preserveState href={first.url} />
        </PaginationItem>

        {linksExcludeFirstAndLast.map((link: any) => (
          <PaginationItem key={link.url}>
            <PaginationLink
              href={link.url}
              preserveState
              isActive={link.active}
            >
              {link.label}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext preserveState href={last.url} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const PaginateInfo = ({ from, to, total }: any) => {
  return (
    <span className="text-xs">
      Showing <span>{from}</span> to <span>{to}</span> of <span>{total}</span>{" "}
      entries
    </span>
  );
};

export { PaginateInfo };

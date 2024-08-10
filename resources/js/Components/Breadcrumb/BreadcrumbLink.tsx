import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useSelector } from "react-redux";
import { AppState } from "@/states";
import { Link } from "@inertiajs/react";

export function BreadcrumbWithCustomSeparator() {
  const breadcrumb = useSelector(
    (state: AppState) => state.breadcrumb.breadcrumb
  );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item: any) => (
          <>
            <BreadcrumbItem key={item.id}>
              {breadcrumb.length - 1 === breadcrumb.indexOf(item) ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {breadcrumb.length - 1 !== breadcrumb.indexOf(item) && (
              <BreadcrumbSeparator />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

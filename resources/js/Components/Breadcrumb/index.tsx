import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppState } from "@/states";
import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";

export function BreadcrumbWithCustomSeparator() {
    const breadcrumb: IBreadcrumbItem[] = useSelector(
        (state: AppState) => state.breadcrumb.breadcrumb
    );

    console.log(breadcrumb);

    return (
        <Breadcrumb>
            <BreadcrumbList key={breadcrumb.length}>
                {breadcrumb.map((item: IBreadcrumbItem, index: number) => (
                    <BreadcrumbItem
                        className={item.active ? "text-black text-sm" : ""}
                        key={item.label}
                    >
                        {index === breadcrumb.length - 1 &&
                        breadcrumb.length > 1 ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                            <Link href={item.href}>{item.label}</Link>
                        )}
                        {index !== breadcrumb.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

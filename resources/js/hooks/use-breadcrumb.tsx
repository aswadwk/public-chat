import { setBreadcrumbData } from "@/states/breadcrumb/breadcrumbSlice";
import { useDispatch } from "react-redux";

interface BreadcrumbItem {
    href: string;
    label: string;
}

const useBreadcrumb = () => {
    const dispatch = useDispatch();

    const setBreadcrumb = (breadcrumbItems: BreadcrumbItem[]) => {
        dispatch(setBreadcrumbData(breadcrumbItems));
    };

    return [setBreadcrumb] as const;
};

export default useBreadcrumb;

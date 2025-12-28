import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { LayoutService } from "../../services/layout.service";
import { LAYOUT } from "../utils/constant";

export const layoutResolver: ResolveFn<string> = () => {
    const layoutService = inject(LayoutService);
    layoutService.selectedSignal.set(LAYOUT.MAIN);
    return LAYOUT.MAIN;
};

export const authLayoutResolver: ResolveFn<string> = () => {
    const layoutService = inject(LayoutService);
    layoutService.selectedSignal.set(LAYOUT.AUTH);
    return LAYOUT.AUTH;
};

export const testLayoutResolver: ResolveFn<string> = () => {
    const layoutService = inject(LayoutService);
    layoutService.selectedSignal.set(LAYOUT.TEST);
    return LAYOUT.TEST;
};
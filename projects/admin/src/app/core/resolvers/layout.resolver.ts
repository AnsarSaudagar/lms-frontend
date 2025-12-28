import { inject } from "@angular/core";
import {  ResolveFn } from "@angular/router";
import { LayoutService } from "../../services/layout.service";

export const layoutResolver: ResolveFn<any> = () => {
    const layoutService = inject(LayoutService)
    layoutService.selectedSignal.set('main');
}
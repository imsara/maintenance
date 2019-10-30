import {ApiInterface, IconInfoInterface, SidebarMenuItemInterface} from "@navvis/indoorviewer";

export class SidebarMenuModifier {

    /*** Menu Icons ***/

    private statueFaceIcon: IconInfoInterface = {
        className: "",
        ligature: "",
        path: "https://png.pngtree.com/png-vector/20190119/ourmid/pngtree-vector-location-icon-png-image_325291.jpg"
    };

    private materialIcon: IconInfoInterface = {
        className: "material-icons",
        ligature: "done",
        path: "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-location-icon-1948176-png-image_1731061.jpg"
    };

    private dataUriIcon: IconInfoInterface = {
        className: "paperclip",
        ligature: "",
        path: "https://img.icons8.com/pastel-glyph/2x/worldwide-location.png"
    };
    private testiIkoni: IconInfoInterface = {
        className: "varikas",
        ligature: "",
        path: "data:image/jpeg;base64,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"
    };

    /*** Menu Items ***/

    private callbackMenuItem: SidebarMenuItemInterface = {
        title: "Ipse Dixit Callback",
        icon: this.materialIcon,
        isVisible: () => true,
        items: [],
        isFullscreen: false,
        onClick: () => window.alert("This is an example of a callback menu entry")
    };

    private formattedIpseDixit: SidebarMenuItemInterface = {
        title: "Ipse Dixit Formatted",
        icon: this.dataUriIcon,
        isVisible: () => true,
        template: "./lorem-ipsum-formatted.html",
        items: [],
        isFullscreen: true
    };

    private rootMenuItem: SidebarMenuItemInterface = {
        title: "Testi",
        icon: this.statueFaceIcon,
        isPreviewIconVisible: () => true,
        isVisible: () => true,
        items: [this.callbackMenuItem, this.formattedIpseDixit],
        isFullscreen: false
    };

    private testi: SidebarMenuItemInterface = {
        title: "kyl",
        icon: this.testiIkoni,
        isVisible: () => true,
        items: [],
        isFullscreen: false,
    };
    ///

    constructor(private ivApi: ApiInterface) {
        const menuItems = this.ivApi.ui.sidebarMenuService.items;
        // Remove all entries besides the login one, and include the new nested one
        menuItems.splice(1, menuItems.length, this.rootMenuItem, this.testi);
        // Automatically open the menu once finished modifying it
        ivApi.ui.sidebarMenuService.openMenu();
    }
}

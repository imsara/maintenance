import {ApiInterface, IconInfoInterface, SidebarMenuItemInterface} from "@navvis/indoorviewer";

export class SidebarMenuModifier {

	/*** Menu Icons ***/

	private statueFaceIcon: IconInfoInterface = {
		className: "",
		ligature: "",
		path: "./greek-statue-face.png"
	};

	private materialIcon: IconInfoInterface = {
		className: "material-icons",
		ligature: "done",
		path: ""
	};

	private dataUriIcon: IconInfoInterface = {
		className: "paperclip",
		ligature: "",
		path: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZ5JREFUeNrUmIGNwyAMANOfgN8gI2QERsgIdIOMkJ8gI9ANOkJGyAiMkG6Qp1IiRZYN/g8YimSpKgZOjrGNb9u2NTWPW+2AEsN4mb2sXpwX60XXANZ5WbxshDy9qJJwawDukHXXrQLOBSxqSsONJx1N6JhScOairjhcaE0Wn7xiDWytS3m7U3yqDllva4E7B3O4TycBd2SRw79s4OBnKity4NpAzKMuQovoqhxwnCzimFbsc1iOk+IoH4O+OH4x4frdl6DJ714e+29FFADv+W8vP+B/7PO9mkQ3DFpOET531rFgDiu5lr9GhP4C3BTZBw6L6LRXfY6Cs5F9LANuKgW3AstgcHMpOBg6MLglFP9yw5nI5ftcuIYRJnLCrbEbO/4zfaWCi1YuLvCGUKXhdCSR65Jw7zFEAiS04CAJh/mfJmq1EcyJwGGAnJK9l4LDEnms1OZUN8ngDh/jPljE4aiciEV16uA+Nxz1YFlO0X1gHNzm7l6NzLcEdXAn0cawF3t6s0Tfb4o8F2MHizQk9W5Nt1tjlmwyflSX/1eAAQCTYjF+fi4HFAAAAABJRU5ErkJggg=="
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
		title: "Ipse Dixit",
		icon: this.statueFaceIcon,
		isPreviewIconVisible: () => true,
		isVisible: () => true,
		items: [this.callbackMenuItem, this.formattedIpseDixit],
		isFullscreen: false
	};

	///

	constructor(private ivApi: ApiInterface) {
		const menuItems = this.ivApi.ui.sidebarMenuService.items;
		// Remove all entries besides the login one, and include the new nested one
		menuItems.splice(1, menuItems.length, this.rootMenuItem);
		// Automatically open the menu once finished modifying it
		ivApi.ui.sidebarMenuService.openMenu();
	}
}

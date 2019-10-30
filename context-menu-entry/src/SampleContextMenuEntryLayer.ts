import {
	ContextMenuEntryInterface, CustomLayer,
	MouseEventCoordinatesInterface
} from "@navvis/indoorviewer";

export class SampleContextMenuEntryLayer extends CustomLayer
{
	public onContextMenu(pos: MouseEventCoordinatesInterface): ContextMenuEntryInterface
	{
		//return the ContextMenuEntryInterface
		return {
			name: "Go to Navvis",
			icon: "fa-globe",
			callback: () =>
			{
				window.open("https://www.navvis.com")
			}
		}
	}
}

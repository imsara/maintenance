import "./index.scss";
import {
	getApi,
	ApiInterface,
} from "@navvis/indoorviewer";
import {SidebarMenuModifier} from "./SidebarMenuModifier";

class TestApp
{
	public ivApi: ApiInterface;

	constructor()
	{
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) => {
				this.ivApi = iv;

				const modifier = new SidebarMenuModifier(iv);
				console.log(modifier);
			});
	}
}

(<any>window).TestApp = new TestApp();

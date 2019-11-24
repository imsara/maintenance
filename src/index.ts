import "./index.scss";
import {getApi, ApiInterface} from "@navvis/indoorviewer";
import {MyApp} from "./MyApp.js";
//import {SidebarMenuModifier} from "./SidebarMenuModifier";

class TestApp
{
	public ivApi: ApiInterface;


	constructor()
	{
		getApi("https://demo.esitevr.com/iv.fortum.jarvenpaa/", {"ui.poi_panel.visible": false})
			.then((iv: ApiInterface) => {
				this.ivApi = iv;
				MyApp.initOverrides();
                /*const modifier = new SidebarMenuModifier(iv);
                console.log(modifier);*/
			});
	}
}

(<any>window).TestApp = new TestApp();

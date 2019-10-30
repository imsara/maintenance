import "./index.scss";
import {getApi, ApiInterface} from "@navvis/indoorviewer";
import {SidebarMenuModifier} from "./SidebarMenuModifier";

class TestApp
{
	public ivApi: ApiInterface;


	constructor()
	{
		getApi("http://demo.esitevr.com/iv.fortum.jarvenpaa/")
			.then((iv: ApiInterface) => {
				this.ivApi = iv;
                const modifier = new SidebarMenuModifier(iv);
                console.log(modifier);
			});
	}
}

(<any>window).TestApp = new TestApp();

import "./index.scss";
import {getApi, ApiInterface} from "@navvis/indoorviewer";
import {SampleContextMenuEntryLayer} from "./SampleContextMenuEntryLayer";

class TestApp
{
	public ivApi: ApiInterface;

	constructor()
	{
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) => {
				this.ivApi = iv;
				new SampleContextMenuEntryLayer(this.ivApi.view.mainView);

			});
	}
}

(<any>window).TestApp = new TestApp();

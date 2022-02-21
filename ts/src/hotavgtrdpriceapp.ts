import { AppWebsocket, CallZomeRequest } from '@holochain/conductor-api';

const WS_URL = 'ws://localhost:8888';
const H_APP_ID = 'test-app';
const ZOME_NAME = 'holotoken';
const FN_NAME = 'fetch_averagehot';


// custom data we want to pass the hApp
interface ZomeInput {
  tradeyear: String;
}

// custom data we want back from the hApp
interface ZomeOutput {
  hot_trading_price: String;
}

AppWebsocket.connect(WS_URL).then(
  // connect to the running holochain conductor
  async (appClient) => {
    const appInfo = await appClient.appInfo({ installed_app_id: H_APP_ID });
    if (!appInfo.cell_data[0]) {
      throw new Error('No app info found');
    }

    const cell_id = appInfo.cell_data[0].cell_id;
    const payload: ZomeInput = { tradeyear: "2021" };
    // define the context of the request
    const apiRequest: CallZomeRequest =
    {
      cap: null,
      cell_id,
      zome_name: ZOME_NAME,
      fn_name: FN_NAME,
      provenance: cell_id[1], // AgentPubKey,
      payload
    };

    try {
      // make the request
      const averagetradingprice: ZomeOutput = await appClient.callZome(apiRequest);
      // the result is already deserialized
      console.log('Average trading price:', averagetradingprice);
    } catch (error) {
      console.log('Got an error:', error);
    } finally {
      appClient.client.close();
    }
  }
);

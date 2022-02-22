import { AppWebsocket, CallZomeRequest } from '@holochain/conductor-api';


const WS_URL = 'ws://localhost:8888';
const H_APP_ID = 'test-app';
const ZOME_NAME = 'pcrtests';
const FN_NAME = 'book_pcrtest';


// custom data we want to pass the hApp
interface ZomeInput {
  patientinfo: String;
}

// custom data we want back from the hApp
interface ZomeOutput {
  booking_day: String;
}

AppWebsocket.connect(WS_URL).then(
  // connect to the running holochain conductor
  async (appClient) => {
    const appInfo = await appClient.appInfo({ installed_app_id: H_APP_ID });
    if (!appInfo.cell_data[0]) {
      throw new Error('No app info found');
    }

    const cell_id = appInfo.cell_data[0].cell_id;
    const payload: ZomeInput = { patientinfo: "ab" };
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
      const booking: ZomeOutput = await appClient.callZome(apiRequest);
      // the result is already deserialized
      console.log('Result of the pcr test:', booking);
    } catch (error) {
      console.log('Got an error:', error);
    } finally {
      appClient.client.close();
    }
  }
);
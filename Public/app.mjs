
import IPFS from 'ipfs-api';

		
		const INFURA_ID="2NMgllrwqtFYoFl14GqnU7WfUzN";
		const INFURA_SECRET_KEY="a6bdce60e26899d184607af50a54b9b0"
		const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');

		async function ipfsClient() {
		    const ipfs = await IPFS(
		        {
		            host: "ipfs.infura.io",
		            port: 5001,
		            protocol: "https",
		            headers: {
		                authorization: auth, 
		            },
		        }
		    );
		    return ipfs;
		}

		async function uploadFile() {
		    let ipfs = await ipfsClient();

		    let fileInput = document.getElementById("fileInput");
		    let file = fileInput.files[0];

		    let reader = new FileReader();
		    reader.readAsArrayBuffer(file);

		    reader.onloadend = async function() {
		        let options = {
		            wrapWithDirectory: false,
		            progress: (prog) => console.log(`Saved: ${prog}`)
		        };
		        let buffer = Buffer.from(reader.result);
		        let result = await ipfs.add(buffer, options);
		        console.log(result);
		    }
		}
	

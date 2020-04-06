import React from "react";

import EthCrypto from "eth-crypto";
import FileBase64 from "react-file-base64";

//This demo uses https://github.com/pubkey/eth-crypto to encrypt and decrypt a file with ethereum pub/priv keys

class EncryptedFileWorkflow extends React.Component {
  state = {
    ethAddress: "0xb550520F22fFb494f862F44A2fe01E1B4e1A86bb",
    ethPrivateKey:
      "0x662466d117f5957c6fe18d029c23a94e3b37b45c83b8dbeeb995e84105a6b35a",
    imageBase64: "",
    decryptedBase64: ""
  };

  encryptAndDecrypt = async files => {
    // Get base64 version of the image.
    let base64OfImage = files[0].base64;

    // Generate a different type of public key from eth private key
    const encryptionPublicKey = EthCrypto.publicKeyByPrivateKey(
      this.state.ethPrivateKey
    );

    // Generate encrypted blob
    const encrypted = await EthCrypto.encryptWithPublicKey(
      encryptionPublicKey,
      base64OfImage
    );

    console.log("Encrypted Blob (To Be Uploaded)");
    console.log(encrypted);

    // Decrypt image wtih private key
    const decryptedImageBase64 = await EthCrypto.decryptWithPrivateKey(
      this.state.ethPrivateKey,
      encrypted
    );

    this.setState({ decryptedBase64: decryptedImageBase64 });
  };

  componentDidMount = () => {};

  render() {
    return (
      <div style={{ paddingTop: "100px" }}>
        <FileBase64 multiple={true} onDone={this.encryptAndDecrypt} />

        {/* Display decrypted file */}
        {this.state.decryptedBase64 === "" ? (
          <h1>Please Upload File</h1>
        ) : (
          <img src={this.state.decryptedBase64} />
        )}
      </div>
    );
  }
}

export default EncryptedFileWorkflow;

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Righteous&family=Caveat&family=Roboto&family=Merriweather&family=Ubuntu:wght@400;700&family=Ubuntu+Mono&family=Source+Code+Pro&family=Titillium+Web&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <body>
                    <Main />
                    <div id="overlays" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

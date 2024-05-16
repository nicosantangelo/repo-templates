import { Client, Conversation } from "./types";

export function getMockClient(): Client {
  return {
    async get(method: string) {
      switch (method) {
        case "ticket.conversation": {
          const conversations: Conversation[] = [
            {
              attachments: [],
              timestamp: "2024-05-07T15:16:07Z",
              author: {
                id: 21732822556055,
                avatar:
                  "https://assets.zendesk.com/images/2016/default-avatar-80.png",
                name: "Ken Collins",
                role: "end-user",
              },
              channel: {
                name: "email",
              },
              message: {
                content:
                  '<div class="zd-comment" dir="auto"><p dir="auto">Block access, this request was not for me, all of my bitcoin is already been stolen through your app\n<br>Sent from my iPhone</p></div>',
                contentType: "text/html",
              },
            },
            {
              attachments: [],
              timestamp: "2024-05-07T17:50:26Z",
              author: {
                id: 8660134190103,
                avatar:
                  "https://muunwallet.zendesk.com/system/photos/8660142855703/profile_image_8660134190103_10763932.jpg",
                name: "Dario Susnisky",
                role: "admin",
              },
              channel: {
                name: "web",
              },
              message: {
                content:
                  '<div class="zd-comment" dir="auto">Hi Ken, thanks for reaching out.<br>&nbsp;<br>I am sorry to hear about your situation and the stolen funds.<br>&nbsp;<br>Since it seems your wallet\'s security has been compromised, I would recommend deleting your wallet so no one (not even you) can access it again. If you provide confirmation, we can delete the wallet associated with &lt;<a href="mailto:ken@exacthouse.com" rel="noreferrer">ken@exacthouse.com</a>&gt; and let you know once it\'s done.<br>&nbsp;<br>On the other hand, let me provide more detail about how Muun\'s security model works and what may have happened. There are two ways of accessing your wallet.<br>&nbsp;<br>The first option would be to access your logged-in device and have your 4-digit PIN code. Please note that after 3 incorrect PIN attempts, the session is logged out. So, does it seem possible that someone took your phone knowing your 4-digit PIN?<br>&nbsp;<br>The second option would be to recover your wallet on a different device. To complete this process, the attacker must click the authorization link sent to your email and enter your password or recovery code.&nbsp;<br>&nbsp;<br>This security model is a two-factor authentication:<br><ol dir="auto"><li>It requires access to your email.</li><li>It is necessary to know your password or have your recovery code.</li></ol>&nbsp;<br>To check if someone recovered your wallet, you must have received an email in your &lt;<a href="mailto:ken@exacthouse.com" rel="noreferrer">ken@exacthouse.com</a>&gt; inbox from &lt;<a href="mailto:no-reply@muun.com" rel="noreferrer">no-reply@muun.com</a>&gt; on February 10th (or before that). <strong><u>Can you please check your inbox to see if you have an authorization email from Muun around that date?</u></strong><br>&nbsp;<br>I am using the February 10th date since the transaction you shared in a previous message was made that day.<br>&nbsp;<br>I\'ll be waiting for your response.<br>&nbsp;<br>Regards,<br>\n\n<span class="collapse-signature"></span><div class="signature"><p dir="auto">Darío<br>\nCustomer Experience -&nbsp; Muun Wallet</p></div></div>',
                contentType: "text/html",
              },
            },
          ];
          return conversations;
        }
        case "ticket.author":
        default:
          // We'll disable the no explicit line here because we're patching a lib's object and the typing will be correct
          // when, from the caller's side of things, generics work.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return [] as any;
      }
    },
    invoke() {
      // Do nothing
    },
  };
}

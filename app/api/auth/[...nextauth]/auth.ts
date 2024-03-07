import { loginEnt } from "@/lib/ent";
import prisma from "@/lib/prisma";
import { createOrGetUser } from "@/lib/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, Theme } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import { createTransport } from "nodemailer";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const login = await loginEnt(
          credentials.username,
          credentials.password,
        );
        if (!login) return null;

        const username = login["supannaliaslogin"];
        const email = login["mail"];
        const firstname = login["givenname"];
        const lastname = login["sn"].toUpperCase();

        const user = await createOrGetUser(
          username,
          email,
          firstname,
          lastname,
        );
        if (!user || user.disabled) return null;

        const data = {
          id: user.id,
        };

        return data;
      },
    }),
    Email({
      server: {
        secure: true,
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (email?.verificationRequest) {
        if (!user.email?.endsWith("@etu.univ-cotedazur.fr")) return false;
      }

      if (account?.provider == "email" && !email?.verificationRequest) {
        if (!user.email) return false;

        const split1 = user.email.split("@");
        if (split1.length !== 2) return false;

        const split2 = split1[0].split(".");

        const firstname = split2[0][0].toUpperCase() + split2[0].slice(1);
        const lastname = split2[1].toUpperCase();

        const result = await createOrGetUser(
          undefined,
          user.email,
          firstname,
          lastname,
        );
        if (!result) return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params;

  const { host } = new URL(url);
  const transport = createTransport(provider.server);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Se connecter à ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Se connecter à <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Se connecter</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Si vous n'avez pas demandé à vous connecter, vous pouvez ignorer cet email.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `Se connecter à ${host}\n${url}\n\n`;
}

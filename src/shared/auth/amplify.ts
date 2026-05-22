import { Amplify } from "aws-amplify";
import { fetchAuthSession, getCurrentUser, signIn, signOut } from "aws-amplify/auth";
import { env } from "../config/env";

let configured = false;

function ensureConfigured() {
  if (configured) {
    return;
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: env.authUserPoolId,
        userPoolClientId: env.authUserPoolWebClientId,
        loginWith: {
          email: true,
          username: true,
        },
      },
    },
  });

  configured = true;
}

export async function getIdToken(): Promise<string | null> {
  ensureConfigured();
  try {
    await getCurrentUser();
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch {
    return null;
  }
}

export async function authSignIn(username: string, password: string): Promise<{ success: boolean; message: string }> {
  ensureConfigured();
  try {
    await signIn({ username, password });
    return { success: true, message: "ok" };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "サインインに失敗しました" };
  }
}

export async function authSignOut(): Promise<void> {
  ensureConfigured();
  await signOut();
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getIdToken()) !== null;
}

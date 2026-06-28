const supabaseErrorMap: Record<string, string> = {
  "Invalid login credentials": "errors.supabase.invalidCredentials",
  "Email not confirmed": "errors.supabase.emailNotConfirmed",
  "User not found": "errors.supabase.userNotFound",
  "Password should be at least 6 characters": "errors.supabase.weakPassword",
  "Weak password": "errors.supabase.weakPassword",
  "A user with this email already exists": "errors.supabase.emailAlreadyRegistered",
  "User already registered": "errors.supabase.emailAlreadyRegistered",
  "Too many requests": "errors.supabase.tooManyRequests",
  "NetworkError when attempting to fetch resource": "errors.supabase.networkError",
  "Failed to fetch": "errors.supabase.networkError",
};

export function translateSupabaseError(supabaseMessage: string): string {
  return supabaseErrorMap[supabaseMessage] ?? "errors.supabase.unknown";
}

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'current_user';
  private readonly TOKEN_KEY = 'token';

  // Generate a simple token (in real app, this would be JWT)
  private generateToken(): string {
    return btoa(Date.now().toString() + Math.random().toString());
  }

  // Get all users from localStorage
  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Find user by email
  private findUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  // Hash password (simple hash for demo - use proper hashing in production)
  private hashPassword(password: string): string {
    return btoa(password + 'salt'); // Simple base64 encoding with salt
  }

  // Verify password
  private verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = this.findUserByEmail(credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, you'd store hashed passwords. For demo, we'll use simple validation
    const storedPassword = localStorage.getItem(`password_${user.id}`);
    if (!storedPassword || !this.verifyPassword(credentials.password, storedPassword)) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken();
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return {
      user,
      token
    };
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // Check if user already exists
    if (this.findUserByEmail(credentials.email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date().toISOString()
    };

    // Save password separately (in real app, hash it properly)
    localStorage.setItem(`password_${newUser.id}`, this.hashPassword(credentials.password));

    // Add user to users list
    const users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);

    const token = this.generateToken();
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));

    return {
      user: newUser,
      token
    };
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  async updateProfile(updates: Partial<Pick<User, 'name' | 'profilePicture'>>): Promise<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);

    // Update current user in localStorage
    const updatedUser = users[userIndex];
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const storedPassword = localStorage.getItem(`password_${currentUser.id}`);
    if (!storedPassword || !this.verifyPassword(currentPassword, storedPassword)) {
      throw new Error('Current password is incorrect');
    }

    localStorage.setItem(`password_${currentUser.id}`, this.hashPassword(newPassword));
  }

  async deleteAccount(): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    // Remove user from users list
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== currentUser.id);
    this.saveUsers(filteredUsers);

    // Remove password
    localStorage.removeItem(`password_${currentUser.id}`);

    // Clear cart data
    localStorage.removeItem('user_cart');

    // Clear auth data
    await this.logout();
  }
}

export const authService = new AuthService();
export type { User, AuthResponse, LoginCredentials, SignupCredentials };

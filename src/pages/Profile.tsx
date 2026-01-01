import { useState, useRef } from 'react';
import { User, Mail, Edit2, Check, X, Camera, Lock, Trash2, AlertTriangle, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Profile = () => {
    const { user, logout, login } = useCart();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        profilePicture: user?.profilePicture || ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveProfile = async () => {
        if (!formData.name.trim()) {
            toast.error("Username cannot be empty");
            return;
        }

        try {
            const updatedUser = await authService.updateProfile({
                name: formData.name,
                profilePicture: formData.profilePicture
            });

            login(updatedUser);
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        }
    };

    const handleUpdatePassword = async () => {
        // Validation checks
        if (!passwords.current) {
            toast.error("Please enter your current password");
            return;
        }
        
        if (!passwords.new) {
            toast.error("Please enter a new password");
            return;
        }
        
        if (passwords.new.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }
        
        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match");
            return;
        }
        
        if (passwords.current === passwords.new) {
            toast.error("New password must be different from your current password");
            return;
        }

        try {
            await authService.changePassword(passwords.current, passwords.new);

            setPasswords({ current: '', new: '', confirm: '' });
            toast.success("Password updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to update password");
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'delete') return;

        try {
            await authService.deleteAccount();

            toast.success("Account deleted successfully");
            logout();
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || "Failed to delete account");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For a real app, you'd upload to Cloudinary/AWS S3
            // Here we'll use a local URL for demonstration
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null; // Protected route handles redirect

    return (
        <div className="min-h-screen pt-12 pb-24 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 transition-colors duration-200">
                    <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-600"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="group relative">
                                <div className="h-24 w-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md border-4 border-white dark:border-gray-700 overflow-hidden flex items-center justify-center transition-colors duration-200">
                                    {formData.profilePicture ? (
                                        <img src={formData.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400 uppercase transition-colors duration-200">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-all"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                />
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                                {!isEditing ? (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                    <button 
                                        onClick={() => { setIsEditing(false); setFormData({...formData, name: user.name}); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-400 dark:text-gray-300"
                                    >
                                        <X className="h-4 w-4" />
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSaveProfile}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors"
                                    >
                                        <Check className="h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                        <div className="space-y-6">
                            {isEditing ? (
                                <div className="max-w-md space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Username</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                            <input 
                                                type="text" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-gray-100"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Email (Read Only)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300 dark:text-gray-600" />
                                            <input 
                                                type="email" 
                                                value={user.email}
                                                readOnly
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-transparent rounded-xl text-gray-400 dark:text-gray-500 cursor-not-allowed font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{user.name}</h1>
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                        <Mail className="h-4 w-4" />
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Password Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            Update Password
                        </h2>
                        <div className="space-y-4 flex-1">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Old Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your current password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your new password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Confirm your new password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleUpdatePassword}
                            className="w-full mt-6 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-600 transition-colors"
                        >
                            Update Password
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 dark:bg-red-900/20 rounded-3xl p-8 border border-red-100 dark:border-red-800/50 flex flex-col transition-colors duration-200">
                        <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-6 flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                            Danger Zone
                        </h2>
                        <p className="text-sm text-red-700/70 dark:text-red-300/80 mb-6">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button 
                            onClick={() => setIsDeleting(true)}
                            className="mt-auto w-full bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 py-3 rounded-xl font-bold hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200 transition-colors duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">Are you absolutely sure?</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">
                                This action will permanently delete your account and all associated data. To confirm, please type <span className="font-bold text-red-600 dark:text-red-400">delete</span> below.
                            </p>
                            
                            <input 
                                type="text" 
                                placeholder="Type 'delete' to confirm"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 rounded-2xl focus:border-red-500 focus:ring-0 transition-all font-bold text-center text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            
                            <div className="flex gap-3 w-full mt-8">
                                <button 
                                    onClick={() => { setIsDeleting(false); setDeleteConfirmText(''); }}
                                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    disabled={deleteConfirmText !== 'delete'}
                                    onClick={handleDeleteAccount}
                                    className={`flex-1 px-4 py-3 rounded-2xl font-bold transition-all ${
                                        deleteConfirmText === 'delete' 
                                        ? 'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 shadow-lg shadow-red-200 dark:shadow-red-900/20' 
                                        : 'bg-red-100 dark:bg-red-900/20 text-red-300 dark:text-red-500 cursor-not-allowed'
                                    }`}
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

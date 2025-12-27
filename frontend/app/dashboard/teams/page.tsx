"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  Avatar,
  EmptyState,
  SkeletonTable,
} from "@/app/components/dashboard/shared";
import { teamService, userService } from "@/app/lib/api/services";
import { Team, TeamMember, User, ApiResponse } from "@/app/lib/api/config";
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  Edit2,
  Trash2,
  X,
  UserPlus,
  UserMinus,
  MapPin,
  Check,
  Loader2,
  Crown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

// ============ TYPES ============
interface TeamWithMembers extends Team {
  members?: TeamMember[];
}

// ============ CREATE/EDIT TEAM MODAL ============
interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: TeamWithMembers | null;
  onSave: (team: Partial<Team>) => Promise<void>;
  availableUsers: User[];
}

function TeamModal({
  isOpen,
  onClose,
  team,
  onSave,
  availableUsers,
}: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description || "",
        leader_id: team.leader_id || "",
      });
    } else {
      setFormData({ name: "", description: "", leader_id: "" });
    }
    setError("");
  }, [team, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Team name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onSave({
        ...formData,
        id: team?.id,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save team");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 animate-scale-in"
        style={{
          background: "var(--background)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {team ? "Edit Team" : "Create New Team"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X
              className="w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-4 p-3 rounded-lg"
            style={{ background: "var(--danger-light)" }}
          >
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Team Name <span style={{ color: "var(--danger)" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-11 px-4 rounded-lg text-sm outline-none"
              style={{
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                background: "var(--background)",
              }}
              placeholder="e.g., Internal Maintenance"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
              style={{
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                background: "var(--background)",
              }}
              placeholder="Team description..."
            />
          </div>

          {/* Team Leader */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Team Leader
            </label>
            <select
              value={formData.leader_id}
              onChange={(e) =>
                setFormData({ ...formData, leader_id: e.target.value })
              }
              className="w-full h-11 px-4 rounded-lg text-sm outline-none"
              style={{
                border: "1px solid var(--border)",
                color: formData.leader_id
                  ? "var(--foreground)"
                  : "var(--foreground-muted)",
                background: "var(--background)",
              }}
            >
              <option value="">Select a leader</option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: "var(--foreground)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50"
              style={{ background: "var(--primary)" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {team ? "Update Team" : "Create Team"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ DELETE CONFIRMATION MODAL ============
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamWithMembers | null;
  onConfirm: () => Promise<void>;
}

function DeleteModal({ isOpen, onClose, team, onConfirm }: DeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-scale-in"
        style={{
          background: "var(--background)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--danger-light)" }}
          >
            <Trash2 className="w-8 h-8" style={{ color: "var(--danger)" }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Delete Team
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "var(--foreground-muted)" }}
          >
            Are you sure you want to delete <strong>{team.name}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: "var(--foreground)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50"
              style={{ background: "var(--danger)" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Team
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MANAGE MEMBERS MODAL ============
interface ManageMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamWithMembers | null;
  availableUsers: User[];
  onAddMember: (teamId: string, userId: string) => Promise<void>;
  onRemoveMember: (teamId: string, oderId: string) => Promise<void>;
  onRefresh: () => void;
}

function ManageMembersModal({
  isOpen,
  onClose,
  team,
  availableUsers,
  onAddMember,
  onRemoveMember,
  onRefresh,
}: ManageMembersModalProps) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [removingUserId, setRemovingUserId] = useState<string | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  // Fetch team members when modal opens
  useEffect(() => {
    if (isOpen && team) {
      fetchMembers();
    }
  }, [isOpen, team?.id]);

  const fetchMembers = async () => {
    if (!team) return;
    setLoadingMembers(true);
    try {
      // The team object may already have members, but we can also fetch fresh
      if (team.members) {
        setMembers(team.members);
      }
    } finally {
      setLoadingMembers(false);
    }
  };

  const teamMemberIds = members.map((m) => m.user_id);
  const availableToAdd = availableUsers.filter(
    (u) => !teamMemberIds.includes(u.id)
  );

  const handleAddMember = async () => {
    if (!selectedUserId || !team) return;
    setIsAdding(true);
    try {
      await onAddMember(team.id, selectedUserId);
      setSelectedUserId("");
      onRefresh();
    } catch (error) {
      console.error("Failed to add member:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!team) return;
    setRemovingUserId(userId);
    try {
      await onRemoveMember(team.id, userId);
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
      onRefresh();
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      setRemovingUserId(null);
    }
  };

  // Update members when team changes
  useEffect(() => {
    if (team?.members) {
      setMembers(team.members);
    }
  }, [team]);

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 animate-scale-in max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          background: "var(--background)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Manage Members
            </h2>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              {team.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X
              className="w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
        </div>

        {/* Add Member */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-4"
          style={{ background: "var(--background-secondary)" }}
        >
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg text-sm outline-none"
            style={{
              border: "1px solid var(--border)",
              color: selectedUserId
                ? "var(--foreground)"
                : "var(--foreground-muted)",
              background: "var(--background)",
            }}
          >
            <option value="">Select a user to add...</option>
            {availableToAdd.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddMember}
            disabled={!selectedUserId || isAdding}
            className="h-10 px-4 rounded-lg text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50"
            style={{ background: "var(--primary)" }}
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            Add
          </button>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto">
          <h3
            className="text-sm font-medium mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Team Members ({members.length})
          </h3>

          {loadingMembers ? (
            <div className="flex items-center justify-center py-8">
              <Loader2
                className="w-6 h-6 animate-spin"
                style={{ color: "var(--primary)" }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-gray-50"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={
                        member.user
                          ? `${member.user.first_name} ${member.user.last_name}`
                          : "User"
                      }
                      size="sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {member.user
                            ? `${member.user.first_name} ${member.user.last_name}`
                            : "Unknown User"}
                        </span>
                        {member.role === "leader" && (
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: "var(--warning-light)",
                              color: "var(--warning)",
                            }}
                          >
                            <Crown className="w-3 h-3" />
                            Leader
                          </span>
                        )}
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {member.user?.email || ""}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.user_id)}
                    disabled={removingUserId === member.user_id}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {removingUserId === member.user_id ? (
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        style={{ color: "var(--danger)" }}
                      />
                    ) : (
                      <UserMinus
                        className="w-4 h-4"
                        style={{ color: "var(--danger)" }}
                      />
                    )}
                  </button>
                </div>
              ))}

              {members.length === 0 && (
                <div className="text-center py-8">
                  <Users
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "var(--foreground-muted)" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    No members in this team yet
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex justify-end pt-4 mt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--primary)" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ TEAM ROW ACTIONS ============
interface TeamRowActionsProps {
  team: TeamWithMembers;
  onEdit: (team: TeamWithMembers) => void;
  onDelete: (team: TeamWithMembers) => void;
  onManageMembers: (team: TeamWithMembers) => void;
}

function TeamRowActions({
  team,
  onEdit,
  onDelete,
  onManageMembers,
}: TeamRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal
          className="w-4 h-4"
          style={{ color: "var(--foreground-muted)" }}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-1 w-48 rounded-xl py-2 z-50 animate-scale-in"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <button
              onClick={() => {
                onManageMembers(team);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: "var(--foreground)" }}
            >
              <Users className="w-4 h-4" />
              Manage Members
            </button>
            <button
              onClick={() => {
                onEdit(team);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: "var(--foreground)" }}
            >
              <Edit2 className="w-4 h-4" />
              Edit Team
            </button>
            <div
              className="my-1 border-t"
              style={{ borderColor: "var(--border)" }}
            />
            <button
              onClick={() => {
                onDelete(team);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-50 transition-colors"
              style={{ color: "var(--danger)" }}
            >
              <Trash2 className="w-4 h-4" />
              Delete Team
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============ MAIN PAGE ============
export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamWithMembers | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<TeamWithMembers | null>(
    null
  );
  const [managingTeam, setManagingTeam] = useState<TeamWithMembers | null>(
    null
  );

  // Fetch teams from API
  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await teamService.list();
      if (response.success && response.data) {
        // API may return array directly or in items property
        const teamsData = Array.isArray(response.data) ? response.data : [];
        setTeams(teamsData);
      } else {
        setError(response.error || "Failed to fetch teams");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch teams");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch users for member selection
  const fetchUsers = useCallback(async () => {
    try {
      const response = await userService.list();
      if (response.success && response.data) {
        // Handle paginated response
        const usersData = Array.isArray(response.data)
          ? response.data
          : (response.data as unknown as { items: User[] }).items || [];
        setUsers(usersData);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, [fetchTeams, fetchUsers]);

  // Filter teams
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CRUD Operations
  const handleSaveTeam = async (teamData: Partial<Team>) => {
    if (teamData.id) {
      // Update existing team
      const response = await teamService.update(teamData.id, teamData);
      if (!response.success) {
        throw new Error(response.error || "Failed to update team");
      }
    } else {
      // Create new team
      const response = await teamService.create(teamData);
      if (!response.success) {
        throw new Error(response.error || "Failed to create team");
      }
    }
    // Refresh the list
    fetchTeams();
  };

  const handleDeleteTeam = async () => {
    if (!deletingTeam) return;
    const response = await teamService.delete(deletingTeam.id);
    if (!response.success) {
      throw new Error(response.error || "Failed to delete team");
    }
    fetchTeams();
    setDeletingTeam(null);
  };

  const handleAddMember = async (teamId: string, userId: string) => {
    const response = await teamService.addMember(teamId, userId);
    if (!response.success) {
      throw new Error(response.error || "Failed to add member");
    }
  };

  const handleRemoveMember = async (teamId: string, userId: string) => {
    const response = await teamService.removeMember(teamId, userId);
    if (!response.success) {
      throw new Error(response.error || "Failed to remove member");
    }
  };

  return (
    <DashboardLayout title="Teams" notificationCount={0}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <SectionHeader
          title="Team Management"
          subtitle="Create and manage maintenance teams"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchTeams()}
            className="p-2.5 rounded-xl transition-colors hover:bg-gray-100"
            style={{ border: "1px solid var(--border)" }}
            title="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            <Plus className="w-4 h-4" />
            New Team
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-6"
          style={{ background: "var(--danger-light)" }}
        >
          <AlertCircle
            className="w-5 h-5 shrink-0"
            style={{ color: "var(--danger)" }}
          />
          <p className="text-sm" style={{ color: "var(--danger)" }}>
            {error}
          </p>
          <button
            onClick={() => fetchTeams()}
            className="ml-auto text-sm font-medium underline"
            style={{ color: "var(--danger)" }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
        style={{
          background: "var(--background)",
          border: "1px solid var(--border)",
        }}
      >
        <Search
          className="w-5 h-5"
          style={{ color: "var(--foreground-muted)" }}
        />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      {/* Teams Table */}
      {isLoading ? (
        <SkeletonTable rows={5} />
      ) : filteredTeams.length === 0 ? (
        <div className="card p-8">
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title={searchQuery ? "No teams found" : "No teams yet"}
            description={
              searchQuery
                ? "Try adjusting your search"
                : "Create your first team to start organizing your maintenance workforce"
            }
            action={
              !searchQuery && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: "var(--primary)" }}
                >
                  <Plus className="w-4 h-4" />
                  Create Team
                </button>
              )
            }
          />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Leader</th>
                  <th>Members</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className="animate-fade-in hover:bg-gray-50 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--primary-100)" }}
                        >
                          <Users
                            className="w-5 h-5"
                            style={{ color: "var(--primary)" }}
                          />
                        </div>
                        <div>
                          <span
                            className="font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            {team.name}
                          </span>
                          {team.description && (
                            <p
                              className="text-xs"
                              style={{ color: "var(--foreground-muted)" }}
                            >
                              {team.description.slice(0, 50)}
                              {team.description.length > 50 ? "..." : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      {team.leader ? (
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={`${team.leader.first_name} ${team.leader.last_name}`}
                            size="sm"
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--foreground)" }}
                          >
                            {team.leader.first_name} {team.leader.last_name}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="text-sm"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          No leader assigned
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: "var(--background-secondary)",
                          color: "var(--foreground)",
                        }}
                      >
                        <Users className="w-3 h-3" />
                        {team.members_count || 0} members
                      </span>
                    </td>
                    <td>
                      {team.location ? (
                        <div className="flex items-center gap-2">
                          <MapPin
                            className="w-4 h-4"
                            style={{ color: "var(--foreground-muted)" }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--foreground)" }}
                          >
                            {team.location.name}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="text-sm"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td>
                      <TeamRowActions
                        team={team}
                        onEdit={setEditingTeam}
                        onDelete={setDeletingTeam}
                        onManageMembers={setManagingTeam}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <TeamModal
        isOpen={isCreateModalOpen || !!editingTeam}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingTeam(null);
        }}
        team={editingTeam}
        onSave={handleSaveTeam}
        availableUsers={users}
      />

      <DeleteModal
        isOpen={!!deletingTeam}
        onClose={() => setDeletingTeam(null)}
        team={deletingTeam}
        onConfirm={handleDeleteTeam}
      />

      <ManageMembersModal
        isOpen={!!managingTeam}
        onClose={() => setManagingTeam(null)}
        team={managingTeam}
        availableUsers={users}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onRefresh={fetchTeams}
      />
    </DashboardLayout>
  );
}

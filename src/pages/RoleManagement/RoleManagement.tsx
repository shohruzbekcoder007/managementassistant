import { useState } from 'react';
import { 
  useGetRoleListQuery, 
  useCreateRoleMutation,
  useDeleteRoleMutation 
} from '../../store/api/apiSlice';
import { usePermission } from '../../hooks/usePermission';
import { UserRole, RoleLabels } from '../../types/auth.types';
import { ToastService } from '../../services/toast.service';
import { Button } from '../../components/Button';
import styles from './RoleManagement.module.scss';
import type { CreateRoleRequest } from '../../types/role.types';

/**
 * Role Management Component
 * Allows admins to assign and manage user roles
 * Requires canManageRoles permission
 */
export const RoleManagement = () => {
  const { hasPermission } = usePermission();
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Fetch role list
  const { data: roleListData, isLoading, refetch } = useGetRoleListQuery({ page, limit: 10 });
  
  // Mutations
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  // Form state
  const [formData, setFormData] = useState<CreateRoleRequest>({
    role: UserRole.USER,
    user_id: '',
    company_id: '',
  });

  // Check permission
  const canManageRoles = hasPermission('canManageRoles');

  if (!canManageRoles) {
    return (
      <div className={styles.noPermission}>
        <h2>🚫 Kirish taqiqlangan</h2>
        <p>Sizda role boshqarish huquqi yo'q</p>
      </div>
    );
  }

  // Handle create role
  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.company_id) {
      ToastService.error('Barcha maydonlarni to\'ldiring');
      return;
    }

    try {
      await createRole(formData).unwrap();
      ToastService.success('Role muvaffaqiyatli tayinlandi');
      setShowCreateModal(false);
      setFormData({ role: UserRole.USER, user_id: '', company_id: '' });
      refetch();
    } catch (error: any) {
      ToastService.error(error?.data?.message || 'Xatolik yuz berdi');
    }
  };

  // Handle delete role
  const handleDeleteRole = async (id: string) => {
    if (!window.confirm('Rostdan ham bu roleni o\'chirmoqchimisiz?')) {
      return;
    }

    try {
      await deleteRole(id).unwrap();
      ToastService.success('Role o\'chirildi');
      refetch();
    } catch (error: any) {
      ToastService.error(error?.data?.message || 'Xatolik yuz berdi');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Role Boshqaruvi</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          + Yangi Role Tayinlash
        </Button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Yangi Role Tayinlash</h2>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateRole} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Foydalanuvchi ID</label>
                <input
                  type="text"
                  value={formData.user_id}
                  onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                  placeholder="3fa85f64-5717-4562-b3fc-2c963f66afa6"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Kompaniya ID</label>
                <input
                  type="text"
                  value={formData.company_id}
                  onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                  placeholder="3fa85f64-5717-4562-b3fc-2c963f66afa6"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: Number(e.target.value) as typeof UserRole[keyof typeof UserRole] })}
                >
                  <option value={UserRole.USER}>{RoleLabels[UserRole.USER]}</option>
                  <option value={UserRole.ADMIN}>{RoleLabels[UserRole.ADMIN]}</option>
                  <option value={UserRole.OWNER}>{RoleLabels[UserRole.OWNER]}</option>
                  <option value={UserRole.ACCOUNTANT}>{RoleLabels[UserRole.ACCOUNTANT]}</option>
                  <option value={UserRole.SUPERADMIN}>{RoleLabels[UserRole.SUPERADMIN]}</option>
                  <option value={UserRole.GUEST}>{RoleLabels[UserRole.GUEST]}</option>
                </select>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" isLoading={isCreating}>
                  Tayinlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role List */}
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Yuklanmoqda...</div>
        ) : roleListData?.results && roleListData.results.length > 0 ? (
          <>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div>Foydalanuvchi ID</div>
                <div>Kompaniya ID</div>
                <div>Role</div>
                <div>Amallar</div>
              </div>
              
              {roleListData.results.map((roleItem) => (
                <div key={roleItem.id} className={styles.tableRow}>
                  <div>{roleItem.user_id}</div>
                  <div>{roleItem.company_id}</div>
                  <div>
                    <span className={styles.roleBadge}>
                      {RoleLabels[roleItem.role]}
                    </span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => roleItem.id && handleDeleteRole(roleItem.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                variant="secondary"
              >
                ← Oldingi
              </Button>
              
              <span className={styles.pageInfo}>
                Sahifa {page} • Jami: {roleListData.count}
              </span>
              
              <Button
                onClick={() => setPage(page + 1)}
                disabled={!roleListData.next}
                variant="secondary"
              >
                Keyingi →
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <p>Hozircha tayinlangan rolelar yo'q</p>
            <Button onClick={() => setShowCreateModal(true)}>
              Birinchi roleni tayinlang
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

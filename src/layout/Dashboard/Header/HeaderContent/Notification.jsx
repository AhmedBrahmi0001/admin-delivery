import { useRef, useState } from 'react';
import {
  useTheme,
  Avatar,
  Badge,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Tooltip,
  Typography,
  Box,
  useMediaQuery
} from '@mui/material';
import { BellOutlined, CheckCircleOutlined, GiftOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { useMarkAllNotificationAsRead, useMarkNotificationAsRead, useNotificationModels } from 'hooks/notification.api';

// Placeholder hooks for fetching notifications - replace with your actual API hooks

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Fetch notifications
  const { data: notificationData, refetch } = useNotificationModels();
  console.log(notificationData?.data);
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationAsRead();

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsReadMutation.mutateAsync({ notificationId });
      refetch();
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      refetch();
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  // Ensure notifications is an array
  const notifications = Array.isArray(notificationData?.data) ? notificationData?.data : [];
  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        ref={anchorRef}
        aria-controls={open ? 'notification-popover' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={unreadCount} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [matchesXs ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    unreadCount > 0 && (
                      <Tooltip title="Mark all as read">
                        <IconButton color="success" size="small" onClick={handleMarkAllAsRead}>
                          <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id}>
                          <ListItemButton selected={!notification.is_read} onClick={() => handleMarkAsRead(notification.id)}>
                            <ListItemAvatar>
                              <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                                <GiftOutlined />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="h6">{notification.title}</Typography>}
                              secondary={notification.message}
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                {notification.time}
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                        </div>
                      ))
                    ) : (
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="text.secondary">
                            No notifications
                          </Typography>
                        }
                      />
                    )}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

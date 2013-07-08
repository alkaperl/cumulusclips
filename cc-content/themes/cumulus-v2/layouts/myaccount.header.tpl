<!DOCTYPE html>
<html>
<head>
<title><?=$meta->title?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="baseUrl" content="<?=HOST?>" />
<?php View::WriteMeta(); ?>
<?php Plugin::Trigger ('theme.head'); ?>
<link rel="shortcut icon" type="image/x-icon" href="<?=HOST?>/favicon.ico" />
<link rel="stylesheet" type="text/css" href="<?=$config->theme_url?>/css/reset.css" />
<link rel="stylesheet" type="text/css" href="<?=$config->theme_url?>/css/main.css" />
<link rel="stylesheet" type="text/css" href="<?=$config->theme_url?>/css/myaccount.css" />
<?php View::WriteCSS(); ?>

</head>
<body class="<?=View::CssHooks()?>">
<?php Plugin::Trigger ('theme.body'); ?>
    
<!-- BEGIN WRAPPER -->
<div id="wrapper">
    
    <!-- BEGIN HEADER -->
    <div id="header">
        <div id="sub_header">
            <a id="logo" href="<?=HOST?>/" title="CumulusClips - Free Video Sharing CMS, Video Sharing Script, YouTube Clone Script">CumulusClips - Free Video Sharing CMS, Video Sharing Script, YouTube Clone Script</a>
            <div id="header_right">
                
            <?php if ($logged_in): ?>
            
                <a href="<?=HOST?>/logout/" title="<?=Language::GetText('logout')?>"><?=Language::GetText('logout')?></a>
                <a href="<?=HOST?>/myaccount/" title="<?=Language::GetText('myaccount')?>"><?=Language::GetText('myaccount')?></a>
                <a title="<?=Language::GetText('view_my_profile')?>" href="<?=HOST?>/members/<?=$user->username?>/"><?=Language::GetText('view_my_profile')?></a>

                <?php if (User::CheckPermissions ('admin_panel', $user)): ?>
                    <a href="<?=HOST?>/cc-admin/" title="<?=Language::GetText('admin_panel')?>"><?=Language::GetText('admin_panel')?></a>
                <?php endif ?>

            <?php else: ?>
                <a href="<?=HOST?>/login/" title="<?=Language::GetText('login')?>"><?=Language::GetText('login')?></a>
                <a href="<?=HOST?>/register/" title="<?=Language::GetText('register')?>"><?=Language::GetText('register')?></a>
            <?php endif; ?>       
                
                <form action="<?=HOST?>/search/" method="post">
                    <input class="defaultText" title="<?=Language::GetText('search_text')?>" type="text" name="keyword" value="<?=Language::GetText('search_text')?>" />
                    <input type="hidden" name="submitted_search" value="TRUE" />
                </form>
            </div>
        </div>
    </div>
    <!-- END HEADER -->
    
    <?php View::Block ('header_nav.tpl'); ?>
    
    <!-- BEGIN MAIN CONTAINER -->
    <div id="retainer">
        <div id="main">
            
        <!-- BEGIN SIDEBAR -->
        <div class="left">
            <p class="large"><?=Language::GetText('account_menu_header')?></p>
            <div id="menu">
                <p class="big"><?=Language::GetText('manage_media')?></p>
                <ul>
                    <li><a href="<?php echo HOST; ?>/myaccount/upload/" title="<?=Language::GetText('upload_video')?>"><?=Language::GetText('upload_video')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/myvideos/" title="<?=Language::GetText('my_videos')?>"><?=Language::GetText('my_videos')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/myfavorites/" title="<?=Language::GetText('my_favorite_videos')?>"><?=Language::GetText('my_favorite_videos')?></a></li>
                </ul>

                <p class="big"><?=Language::GetText('account_settings')?></p>
                <ul>
                    <li><a href="<?php echo HOST; ?>/myaccount/profile/" title="<?=Language::GetText('update_profile')?>"><?=Language::GetText('update_profile')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/privacy-settings/" title="<?=Language::GetText('privacy_settings')?>"><?=Language::GetText('privacy_settings')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/change-password/" title="<?=Language::GetText('change_password')?>"><?=Language::GetText('change_password')?></a></li>
                </ul>

                <p class="big"><?=Language::GetText('community')?></p>
                <ul>
                    <li><a href="<?php echo HOST; ?>/myaccount/subscriptions/" title="<?=Language::GetText('my_subscriptions')?>"><?=Language::GetText('my_subscriptions')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/subscribers/" title="<?=Language::GetText('my_subscribers')?>"><?=Language::GetText('my_subscribers')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/message/inbox/" title="<?=Language::GetText('inbox')?>"><?=Language::GetText('inbox')?></a></li>
                    <li><a href="<?php echo HOST; ?>/myaccount/message/send/" title="<?=Language::GetText('send_message')?>"><?=Language::GetText('send_message')?></a></li>
                </ul>
            </div>
            <?php View::WriteSidebarBlocks(); ?>
        </div>
        <!-- END SIDEBAR -->


        <!-- BEGIN CONTENT -->
        <div class="right">
                
                
                

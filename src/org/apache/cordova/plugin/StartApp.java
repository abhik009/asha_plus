package org.apache.cordova.plugin;

import org.apache.cordova.DroidGap;
import org.apache.cordova.api.LegacyContext;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;


/**
 * Launches an external application.
 *
 * @author Dmitry Medvinsky <dmedvinsky@gmail.com>
 * @license MIT/X11
 */
public class StartApp extends Plugin
{
    /**
     * Executes the request and returns PluginResult.
     *
     * @param action
     *          Action to perform.
     * @param args
     *          Arguments to the action.
     * @param callbackId
     *          JavaScript callback ID.
     * @return A PluginResult object with a status and message.
     */
    public PluginResult execute(String action, JSONArray args, String callbackId)
    {
        try {
            if (action.equals("startApp")) {
                if (args.length() != 1) {
                    return new PluginResult(PluginResult.Status.INVALID_ACTION);
                }
                String component = args.getString(0);
                startActivity(component);
                return new PluginResult(PluginResult.Status.OK);
            }
            return new PluginResult(PluginResult.Status.INVALID_ACTION);
        } catch (JSONException e) {
            e.printStackTrace();
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }

    /**
     * Starts an activity.
     *
     * @param component
     *            Activity ComponentName.
     *            E.g.: com.mycompany.myapp/com.mycompany.myapp.MyActivity
     */
    @SuppressWarnings({ "deprecation", "deprecation" })
	void startActivity(String component) {
    		Log.d("StartApp","StartApp Plugin");
    		  //Context myContext = this.ctx;
			// Make sure the Skype for Android client is installed
    		  if (!isSkypeClientInstalled(this.ctx)) {
    		    goToMarket(this.ctx);
    		    return;
    		  }

    		  // Create the Intent from our Skype URI
    		  //Uri skypeUri = Uri.parse(mySkypeUri);
    		  Intent myIntent = new Intent(Intent.ACTION_VIEW);

    		  // Restrict the Intent to being handled by the Skype for Android client only
    		  myIntent.setComponent(new ComponentName("com.skype.raider", "com.skype.raider.Main"));
    		  myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

    		  // Initiate the Intent. It should never fail since we've already established the
    		  // presence of its handler (although there is an extremely minute window where that
    		  // handler can go away...)
    		  this.ctx.startActivity(myIntent);

    		  return;
    		  /*
        Intent intent = new Intent("android.intent.action.ACTION_VIEW");
        intent.addCategory("android.intent.category.LAUNCHER");
        intent.setComponent(ComponentName.unflattenFromString(component));
        //boolean isSkypeInstalled = isSkypeClientInstalled(); 	
        ((Activity) this.ctx).startActivity(intent);*/
    }
    public boolean isSkypeClientInstalled(LegacyContext ctx) {
		@SuppressWarnings("null")
		PackageManager myPackageMgr = ctx.getPackageManager();
    	  try {
    	    myPackageMgr.getPackageInfo("com.skype.raider", PackageManager.GET_ACTIVITIES);
    	  }
    	  catch (PackageManager.NameNotFoundException e) {
    	    goToMarket(ctx);
    	  }
    	  return (true);
    	}

    public void goToMarket(LegacyContext ctx) {
      Uri marketUri = Uri.parse("market://details?id=com.skype.raider");
      Intent myIntent = new Intent(Intent.ACTION_VIEW, marketUri);
      myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      ctx.startActivity(myIntent);

      return;
    }
}

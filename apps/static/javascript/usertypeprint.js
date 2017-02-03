$(function() {
	userstatus();
    var ref = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/");
    ref.once("value", function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	        var key = childSnapshot.key();
	        var refItem = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/"+ key+'/season');
	            refItem.on("value", function(snapshot) {
	            var itemSeason = snapshot.val();
	            $('#slide_'+key).data('item-season',itemSeason);
		     })
	    })

    	snapshot.forEach(function(childSnapshot) {
	        var key = childSnapshot.key();
	        var refItem = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/"+ key+'/place');
	            refItem.on("value", function(snapshot) {
	            var itemPlace = snapshot.val();
	            $('#slide_'+key).data('item-place',itemPlace);
		    })
	    })
	})

	//choose familytype and print it's appliance group
	$('input[name="house"]').click(function(){
		var housetype = $('#'+this.id).data('house-type');
		base = new Array();
		elec = new Array();
		var refBase = new Firebase("https://electricbillcount.firebaseio.com/usetype/"+housetype+"/base");
		refBase.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var key = childSnapshot.key();
			    var childData = childSnapshot.val();
			    base.push({Level: key, ConsumeFee: childData });
			})
		})

		var refElec = new Firebase("https://electricbillcount.firebaseio.com/usetype/"+housetype+"/electric");
		refElec.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var key = childSnapshot.key();
			    var childData = childSnapshot.val();
			    elec.push({Level: key, ConsumeFee: childData });
			})
		})
	})
});

// 유저 로그인 & 로그아웃 상태체크
function userstatus() {
	var ref = new Firebase("https://electricbillcount.firebaseio.com");
	var authData = ref.getAuth();
  	if (authData) {
  	} else{
	    window.location.replace("/membership");
	}
};
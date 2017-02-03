$(function() {
	userstatus();
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